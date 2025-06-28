import { IsString, IsOptional, IsNumber, MinLength, MaxLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Tên danh mục phải có ít nhất 2 ký tự' })
  @MaxLength(100, { message: 'Tên danh mục không được quá 100 ký tự' })
  name?: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;
} 