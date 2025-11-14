// product-discount.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ProductDiscount {
  @PrimaryGeneratedColumn()
  id: number;

  // Reference to the external Product Microservice's ID
  @Column()
  productId: string; 

  // The discount value (e.g., 0.10 for 10% off)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number; 

  @Column()
  salesChannel: string; 

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}