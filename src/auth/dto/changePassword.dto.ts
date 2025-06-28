import { Length } from 'class-validator';

export class ChangePasswordDto {
  @Length(8, 255, {
    message: 'New password must be at least 8 characters long',
  })
  newPassword: string;

  @Length(8, 255, {
    message: 'Confirm password must be at least 8 characters long',
  })
  confirmPassword: string;

  @Length(8, 255, {
    message: 'Current password must be at least 8 characters long',
  })
  currentPassword: string;
}
