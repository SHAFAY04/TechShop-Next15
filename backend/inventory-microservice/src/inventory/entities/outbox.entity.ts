// outbox.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('outbox')
export class Outbox {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pattern: string; // e.g., 'product_created'

  @Column({ type: 'jsonb' }) // or 'json' for MySQL
  payload: any;

  @Column({ default: 'PENDING' }) // PENDING, SENT, FAILED
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}