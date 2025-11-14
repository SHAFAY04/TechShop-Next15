// base-price.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class BasePrices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  productId: number; 

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  baseUsdPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}