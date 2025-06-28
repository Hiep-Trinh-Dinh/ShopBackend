import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password/:id')
  async changePassword(
    @Param('id') id: string,
    @Body() data: ChangePasswordDto,
  ) {
    return await this.authService.changePassword(id, data);
  }

  @Post('refresh')
  async refresh(@Body() body: { refresh_token: string }) {
    const payload = this.authService.verifyRefreshToken(body.refresh_token);
    return {
      access_token: this.authService.generateAccessToken(payload),
    };
  }
}
