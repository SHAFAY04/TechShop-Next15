// voucher.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Voucher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  code: string; // e.g., 'BLACKFRIDAY80'

  @Column()
  salesChannel: string; 

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number; // The discount amount (e.g., 0.20 for 20% )

  @Column({ type: 'integer', nullable: true })
  minCartValue: number;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}