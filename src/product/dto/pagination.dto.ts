import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'Trang phải lớn hơn hoặc bằng 1' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'Giới hạn phải lớn hơn hoặc bằng 1' })
  @Max(100, { message: 'Giới hạn không được quá 100' })
  limit?: number = 8;
} 