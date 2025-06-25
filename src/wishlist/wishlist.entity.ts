import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('wishlists')
export class Wishlist {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'product_id' })
  productId: number;
} 