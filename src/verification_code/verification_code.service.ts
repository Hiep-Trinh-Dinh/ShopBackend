import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VerificationCode } from './verification_code.entity';
import { Repository } from 'typeorm';
import {
  generateVerifyCode,
  getExpirationDate,
} from 'src/helper/verification_code.helper';
import { ConfirmDto } from './dto/confirm.dto';
import { SendCodeAgainDto } from './dto/sendCodeAgain.dto';
import { MailerService } from 'src/common/mailer/mailer.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class VerificationCodeService {
  constructor(
    @InjectRepository(VerificationCode)
    private readonly verificationCodeRepository: Repository<VerificationCode>,
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) {}

  async createVerificationCode(
    userId: string,
    type: string = 'email',
  ): Promise<VerificationCode> {
    const code = generateVerifyCode();
    const expiresAt = getExpirationDate();

    const verificationCode = this.verificationCodeRepository.create({
      userId,
      code,
      type,
      expiresAt,
    });

    return this.verificationCodeRepository.save(verificationCode);
  }

  async confirmVerificationCode(
    confirmDto: ConfirmDto,
  ): Promise<VerificationCode | null> {
    const { userId, code } = confirmDto;
    const verificationCode = await this.verificationCodeRepository.findOne({
      where: { userId, code, isUsed: false },
    });

    if (!verificationCode) {
      return null;
    }

    const now = new Date();
    if (verificationCode.expiresAt < now) {
      throw new BadRequestException(
        'Verification code expired. Please request a new one.',
      );
    }

    verificationCode.isUsed = true;
    return this.verificationCodeRepository.save(verificationCode);
  }

  async checkUserVerifiedCode(userId: string): Promise<boolean> {
    const verified = await this.verificationCodeRepository.findOne({
      where: {
        userId,
        isUsed: true,
      },
    });
    return !!verified;
  }

  async sendCodeAgain(
    sendCodeAgainDto: SendCodeAgainDto,
  ): Promise<VerificationCode> {
    const { userId } = sendCodeAgainDto;
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const newCode = await this.createVerificationCode(userId);

    await this.mailerService.sendVerifyCode(user.email, newCode.code);

    return newCode;
  }
}
