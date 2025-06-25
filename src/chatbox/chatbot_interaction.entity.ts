import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('chatbot_interactions')
export class ChatbotInteraction {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id', nullable: true })
  userId?: string;

  @Column({ name: 'session_id' })
  sessionId: string;

  @Column()
  message: string;

  @Column()
  response: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
} 