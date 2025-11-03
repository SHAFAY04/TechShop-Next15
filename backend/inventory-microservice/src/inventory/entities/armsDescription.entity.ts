import {
    Entity,
    Column,
    PrimaryColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { products } from './products.entity';

@Entity('monitorarms_descriptions')
export class MonitorarmsDescription {
    @PrimaryColumn()
    productId: number;

    @Column('varchar', { length: 20 })
    mount_type: string; // Clamp, Grommet, Wall

    @Column('int')
    number_of_monitors: number;

    @Column('decimal', { precision: 4, scale: 1 })
    weight_capacity_lbs: number; // Per arm

    @Column('int')
    max_screen_size_inches: number;

    @Column('boolean', { default: false })
    gas_spring_assisted: boolean;

    @Column('varchar', { length: 20 })
    vesa_compatibility: string; // 75x75, 100x100

    @Column('decimal', { precision: 4, scale: 1 })
    vertical_adjustment_in: number;

    @Column('varchar', { length: 20 })
    color: string;

    @OneToOne(() => products, (products) => products.monitorarmsDescription)
    @JoinColumn({ name: 'productId' })
    product: products;
}