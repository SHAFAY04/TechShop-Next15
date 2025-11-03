import {
    Entity,
    Column,
    PrimaryColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { products } from './products.entity';

@Entity('mouse_descriptions')
export class MouseDescription {
    // Primary Key and Foreign Key to the Product table (One-to-One relationship)
    @PrimaryColumn()
    productId: number;

    @Column('int')
    weight_g: number;

    @Column('int')
    dpi_max: number;

    @Column('varchar', { length: 50 })
    sensor_model: string;

    @Column('varchar', { length: 20 })
    connection_type: string;

    @Column('varchar', { length: 20 })
    form_factor: string; // Right-handed, Ambidextrous, Vertical

    @Column('varchar', { length: 20 })
    grip_style: string; // Palm, Claw, Fingertip

    @Column('int')
    programmable_buttons: number;

    @Column('int', { default: 1000 })
    polling_rate_hz: number;

    // One-to-One relationship back to the core Product entity
    @OneToOne(() => products, (products) => products.mouseDescription)
    @JoinColumn({ name: 'productId' }) // Defines the foreign key column
    product: products;
}