import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'order_id' })
  orderId: number;

  @Column({ name: 'payment_method' })
  paymentMethod: string;

  @Column({ name: 'payment_status', type: 'enum', enum: PaymentStatus })
  paymentStatus: PaymentStatus;

  @Column({ name: 'paid_at', type: 'timestamp', nullable: true })
  paidAt?: Date;

  @Column({ name: 'transaction_id', nullable: true })
  transactionId?: string;
} 