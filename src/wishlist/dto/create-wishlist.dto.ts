import { IsString, IsNumber } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  userId: string;

  @IsNumber()
  productId: number;
} 