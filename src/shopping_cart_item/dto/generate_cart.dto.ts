import { IsNumber, IsUUID, Min } from 'class-validator';

export class GenerateCartDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}
