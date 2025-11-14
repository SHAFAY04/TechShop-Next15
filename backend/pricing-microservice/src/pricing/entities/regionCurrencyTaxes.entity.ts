// region-currency-tax.entity.ts

import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class RegionCurrencyTax {
  @PrimaryColumn()
  salesChannel: string;

  @Column({ length: 5 })
  currencyCode: string; // e.g., 'PKR', 'USD'

  // Exchange rate relative to the base currency (e.g., 280.00)
  @Column({ type: 'decimal', precision: 10, scale: 4 })
  exchangeRate: number; 

  // Tax rate (e.g., 0.17 for 17%)
  @Column({ type: 'decimal', precision: 5, scale: 4 })
  taxRate: number; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}