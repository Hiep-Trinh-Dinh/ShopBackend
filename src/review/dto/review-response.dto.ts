export class ReviewResponseDto {
  id: number;
  userId: string;
  productId: number;
  rating: number;
  comment?: string;
  createdAt: Date;
  user?: {
    id: string;
    fullName: string;
    email: string;
  };
  product?: {
    id: number;
    name: string;
    categoryName?: string;
  };
} 