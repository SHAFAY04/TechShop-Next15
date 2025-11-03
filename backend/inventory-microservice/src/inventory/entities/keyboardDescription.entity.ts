import {
    Entity,
    Column,
    PrimaryColumn,
    OneToOne,
    JoinColumn,
}
from 'typeorm';
import { products } from './products.entity';

@Entity('keyboard_descriptions')
export class KeyboardDescription {
    @PrimaryColumn()
    productId: number;

    @Column('varchar', { length: 30 })
    switch_type: string;

    @Column('varchar', { length: 50, nullable: true })
    switch_model: string | null;

    @Column('varchar', { length: 20 })
    form_factor: string; // Full, TKL, 60%

    @Column('varchar', { length: 10 })
    keycap_material: string; // PBT, ABS

    @Column('varchar', { length: 20 })
    backlighting: string; // RGB, White, None

    @Column('varchar', { length: 20 })
    connection_type: string;

    @Column('varchar', { length: 20 })
    key_rollover: string; // NKRO, 6-Key Rollover

    @Column('boolean', { default: false })
    hot_swappable: boolean;

    @OneToOne(() => products, (products) => products.keyboardDescription)
    @JoinColumn({ name: 'productId' })
    product: products;
}