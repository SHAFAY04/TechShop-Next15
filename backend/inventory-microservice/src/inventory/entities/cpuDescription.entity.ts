import {
    Entity,
    Column,
    PrimaryColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { products } from './products.entity';

@Entity('cpu_descriptions')
export class CPUDescription {
    @PrimaryColumn()
    productId: number;

    @Column('varchar', { length: 20 })
    socket_type: string; // LGA 1700, AM5

    @Column('int')
    core_count: number;

    @Column('int')
    thread_count: number;

    @Column('decimal', { precision: 3, scale: 2 })
    base_clock_ghz: number;

    @Column('decimal', { precision: 3, scale: 2 })
    boost_clock_ghz: number;

    @Column('int')
    tdp_watts: number;

    @Column('varchar', { length: 50, nullable: true })
    integrated_graphics: string | null; // e.g., 'Intel UHD 770'

    @Column('int')
    l3_cache_mb: number;

    @OneToOne(() => products, (products) => products.cpuDescription)
    @JoinColumn({ name: 'productId' })
    product: products;
}