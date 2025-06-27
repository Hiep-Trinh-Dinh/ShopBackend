export class ProductResponseDto {
  id: number;
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  categoryId?: number;
  categoryName?: string;
  brand?: string;
  discountPercent?: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
} 