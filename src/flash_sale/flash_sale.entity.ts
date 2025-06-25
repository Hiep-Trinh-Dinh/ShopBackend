import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('flash_sales')
export class FlashSale {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ name: 'discount_percent', type: 'numeric', precision: 5, scale: 2 })
  discountPercent: number;

  @Column({ name: 'start_time', type: 'timestamp' })
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamp' })
  endTime: Date;

  @Column({ name: 'max_quantity' })
  maxQuantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 