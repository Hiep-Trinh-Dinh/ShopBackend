import { IsString, IsNumber, IsOptional, Min, Max, MinLength, MaxLength } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(1, { message: 'Rating must be between 1 and 5' })
  @Max(5, { message: 'Rating must be between 1 and 5' })
  rating?: number;

  @IsOptional()
  @IsString({ message: 'Comment must be a string' })
  @MinLength(10, { message: 'Comment must be at least 10 characters' })
  @MaxLength(500, { message: 'Comment must not exceed 500 characters' })
  comment?: string;
} 