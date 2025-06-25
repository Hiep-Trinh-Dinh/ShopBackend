import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum VerificationType {
  EMAIL = 'email',
  PHONE = 'phone',
}

@Entity('verification_codes')
export class VerificationCode {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  code: string;

  @Column({ type: 'enum', enum: VerificationType })
  type: VerificationType;

  @Column({ name: 'is_used', default: false })
  isUsed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'expires_at', type: 'timestamp' })
  expiresAt: Date;
} 