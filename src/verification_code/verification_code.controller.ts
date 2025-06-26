import { Body, Controller, Post } from '@nestjs/common';
import { VerificationCodeService } from './verification_code.service';
import { ConfirmDto } from './dto/confirm.dto';
import { SendCodeAgainDto } from './dto/sendCodeAgain.dto';

@Controller('verification_code')
export class VerificationCodeController {
  constructor(
    private readonly verificationCodeService: VerificationCodeService,
  ) {}

  @Post('confirm')
  async confirmVerificationCode(@Body() confirmDto: ConfirmDto) {
    return await this.verificationCodeService.confirmVerificationCode(
      confirmDto,
    );
  }

  @Post('send-again')
  async sendCodeAgain(@Body() sendCodeAgainDto: SendCodeAgainDto) {
    return await this.verificationCodeService.sendCodeAgain(sendCodeAgainDto);
  }
}
