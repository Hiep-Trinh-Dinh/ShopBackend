import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('shopping_cart_items')
export class ShoppingCartItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'product_id' })
  productId: number;

  @Column()
  quantity: number;
} 