import { IsString, IsOptional, IsNumber, IsUrl, Min, Max, MinLength, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2, { message: 'Tên sản phẩm phải có ít nhất 2 ký tự' })
  @MaxLength(200, { message: 'Tên sản phẩm không được quá 200 ký tự' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Mô tả không được quá 1000 ký tự' })
  description?: string;

  @IsNumber()
  @Min(0, { message: 'Giá sản phẩm phải lớn hơn hoặc bằng 0' })
  price: number;

  @IsNumber()
  @Min(0, { message: 'Số lượng tồn kho phải lớn hơn hoặc bằng 0' })
  stockQuantity: number;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Thương hiệu không được quá 100 ký tự' })
  brand?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Phần trăm giảm giá phải lớn hơn hoặc bằng 0' })
  @Max(100, { message: 'Phần trăm giảm giá không được quá 100%' })
  discountPercent?: number;

  @IsOptional()
  @IsUrl({}, { message: 'URL hình ảnh không hợp lệ' })
  imageUrl?: string;
} 