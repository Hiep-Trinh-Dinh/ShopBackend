import {
  IsString,
  IsOptional,
  IsNumber,
  MinLength,
  MaxLength,
  IsUrl,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(2, { message: 'Category name must be at least 2 characters' })
  @MaxLength(100, { message: 'Category name cannot exceed 100 characters' })
  name: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
