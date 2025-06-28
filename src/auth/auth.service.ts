import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { MailerService } from 'src/common/mailer/mailer.service';
import { VerificationCodeService } from 'src/verification_code/verification_code.service';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly verifyCodeService: VerificationCodeService,
    private readonly mailerService: MailerService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('User not found! Please register.');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Password is incorrect! Please try again.',
      );
    }

    const checkVerifiedCode =
      await this.verifyCodeService.checkUserVerifiedCode(user.id);

    if (!checkVerifiedCode) {
      throw new UnauthorizedException(
        'User is not verified! Please verify your account.',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.generateAccessToken(payload),
      refresh_token: this.generateRefreshToken(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, confirmPassword } = registerDto;

    if (!email) {
      throw new BadRequestException('Missing email');
    }

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.create({
      ...registerDto,
      passwordHash: hashedPassword,
    });

    const verificationCode =
      await this.verifyCodeService.createVerificationCode(newUser.id, 'email');

    await this.mailerService.sendVerifyCode(
      newUser.email,
      verificationCode.code,
    );

    return {
      message: 'Register successful. Please login to continue.',
    };
  }

  async changePassword(id: string, data: ChangePasswordDto) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isCheckPassword = await bcrypt.compare(
      data.currentPassword,
      user.passwordHash,
    );
    if (!isCheckPassword) {
      throw new BadRequestException('Current password is incorrect');
    }
    if (data.newPassword !== data.confirmPassword) {
      throw new BadRequestException(
        'New password and confirm password do not match',
      );
    }
    const newPasswordHash = await bcrypt.hash(data.newPassword, 10);

    await this.userService.updatePassword(user.id, newPasswordHash);

    return {
      message: 'Password changed successfully',
    };
  }

  generateAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    });
  }

  generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    });
  }

  verifyRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch (e) {
      throw new UnauthorizedException('Refresh token expired or invalid');
    }
  }
}
