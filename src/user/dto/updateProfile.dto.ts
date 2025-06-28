import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @Length(1, 100, { message: 'Full name must be between 1 and 100 characters' })
  fullName?: string;

  @IsOptional()
  @Matches(/^(0|\+84)[0-9]{9}$/, { message: 'Invalid phone number' })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @Length(5, 255, { message: 'Address must be between 5 and 255 characters' })
  address?: string;
}
