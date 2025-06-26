import { IsString, IsUUID } from 'class-validator';

export class ConfirmDto {
  @IsUUID()
  userId: string;

  @IsString()
  code: string;
}
