// src/common/mailer/mailer.service.ts
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendVerifyCode(to: string, code: string) {
    const mailOptions = {
      from: `"E-Commerce App" <${process.env.MAIL_USER}>`,
      to,
      subject: 'Verify your email',
      html: `
        <div style="font-family:sans-serif; line-height:1.5;">
          <h2>Verify your email</h2>
          <p>Your verification code is:</p>
          <h3 style="color:#DB4444;">${code}</h3>
          <p>This code will expire in 5 minutes.</p>
        </div>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
