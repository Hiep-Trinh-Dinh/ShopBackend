export class ProductResponseDto {
  id: number;
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  categoryId?: number;
  category?: object;
  brand?: string;
  discountPercent?: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
