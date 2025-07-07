export class WishlistResponseDto {
  id: number;
  userId: string;
  productId: number;
  product?: {
    id: number;
    name: string;
    description?: string;
    price: number;
    stockQuantity: number;
    brand?: string;
    discountPercent?: number;
    imageUrl?: string;
    categoryName?: string;
  };
} 