import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Entity('wishlists')
export class Wishlist {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
} 