import { IsString, IsNumber, IsOptional, Min, Max, MinLength, MaxLength } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  userId: string;

  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1, { message: 'Đánh giá phải từ 1 đến 5 sao' })
  @Max(5, { message: 'Đánh giá phải từ 1 đến 5 sao' })
  rating: number;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Bình luận phải có ít nhất 10 ký tự' })
  @MaxLength(500, { message: 'Bình luận không được quá 500 ký tự' })
  comment?: string;
} 