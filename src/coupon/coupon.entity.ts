import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ name: 'discount_percent', type: 'numeric', precision: 5, scale: 2 })
  discountPercent: number;

  @Column({ name: 'valid_from', type: 'date' })
  validFrom: string;

  @Column({ name: 'valid_until', type: 'date' })
  validUntil: string;

  @Column({ name: 'max_usage' })
  maxUsage: number;

  @Column({ name: 'used_count' })
  usedCount: number;

  @Column({ name: 'min_order_amount', type: 'numeric', precision: 10, scale: 2 })
  minOrderAmount: number;
} 