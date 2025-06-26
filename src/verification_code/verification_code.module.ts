import { Module } from '@nestjs/common';
import { VerificationCodeService } from './verification_code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationCode } from './verification_code.entity';
import { VerificationCodeController } from './verification_code.controller';
import { MailerModule } from 'src/common/mailer/mailer.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VerificationCode]),
    MailerModule,
    UserModule,
  ],
  controllers: [VerificationCodeController],
  providers: [VerificationCodeService],
  exports: [VerificationCodeService],
})
export class VerificationCodeModule {}
