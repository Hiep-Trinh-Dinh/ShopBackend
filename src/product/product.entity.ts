import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column('numeric', { precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'stock_quantity' })
  stockQuantity: number;

  @Column({ name: 'category_id', nullable: true })
  categoryId?: number;

  @Column({ nullable: true })
  brand?: string;

  @Column('numeric', { precision: 5, scale: 2, nullable: true, name: 'discount_percent' })
  discountPercent?: number;

  @Column({ name: 'image_url', nullable: true })
  imageUrl?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 