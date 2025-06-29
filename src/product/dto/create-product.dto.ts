import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsUrl,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2, { message: 'Product name must be at least 2 characters' })
  @MaxLength(200, { message: 'Product name must not exceed 200 characters' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Description must not exceed 1000 characters' })
  description?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Product price must be greater than or equal to 0' })
  price: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Inventory quantity must be greater than or equal to 0' })
  stockQuantity: number;

  @Type(() => Number)
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Brand name should not exceed 100 characters' })
  brand?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Discount percentage must be greater than or equal to 0' })
  @Max(100, { message: 'Discount percentage cannot exceed 100%' })
  discountPercent?: number;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid image URL' })
  imageUrl?: string;
}
