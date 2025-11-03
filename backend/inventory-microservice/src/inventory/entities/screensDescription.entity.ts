import {
    Entity,
    Column,
    PrimaryColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { products } from './products.entity';

@Entity('screen_descriptions')
export class ScreenDescription {
    @PrimaryColumn()
    productId: number;

    @Column('decimal', { precision: 4, scale: 1 })
    screen_size_inches: number;

    @Column('varchar', { length: 20 })
    resolution: string; // e.g., '3840x2160'

    @Column('int')
    refresh_rate_hz: number;

    @Column('varchar', { length: 10 })
    panel_type: string; // IPS, VA, TN, OLED

    @Column('decimal', { precision: 3, scale: 1 })
    response_time_ms: number;

    @Column('varchar', { length: 30, nullable: true })
    adaptive_sync: string | null; // G-Sync, FreeSync Premium

    @Column('varchar', { length: 10 })
    aspect_ratio: string;

    @Column('varchar', { length: 20, nullable: true })
    hdr_rating: string | null; // VESA DisplayHDR 600

    @Column('int', { nullable: true })
    curvature_r: number | null; // 1000R, 1800R (Flat is null)

    @OneToOne(() => products, (products) => products.screenDescription)
    @JoinColumn({ name: 'productId' })
    product: products;
}