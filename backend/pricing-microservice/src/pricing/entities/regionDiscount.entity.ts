// region-discount.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class RegionDiscount {
  @PrimaryGeneratedColumn()
  id: number;

  // Reference to the salesChannel "name" attribute
  @Column()
  salesChannel: string; 

  // Discount percentage (e.g., 0.15 for 15% off)
  @Column({ type: 'decimal', precision: 5, scale: 4 })
  discountPercent: number; 

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