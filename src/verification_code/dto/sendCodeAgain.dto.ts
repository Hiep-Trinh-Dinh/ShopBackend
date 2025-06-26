import { IsUUID } from 'class-validator';

export class SendCodeAgainDto {
  @IsUUID()
  userId: string;
}
