import {
    Entity,
    Column,
    PrimaryColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { products } from './products.entity';

@Entity('gamingchair_descriptions')
export class GamingchairDescription {
    @PrimaryColumn()
    productId: number;

    @Column('varchar', { length: 30 })
    chair_material: string; // PU Leather, Fabric, Mesh

    @Column('varchar', { length: 10 })
    armrest_adjustability: string; // 4D, 3D, Fixed

    @Column('int')
    max_weight_lbs: number;

    @Column('varchar', { length: 50 })
    recommended_height: string;

    @Column('int')
    recline_angle_degrees: number;

    @Column('varchar', { length: 30 })
    lumbar_support_type: string; // Internal Adjustable, External Pillow

    @Column('varchar', { length: 20 })
    seat_type: string; // Bucket, Flat

    @Column('varchar', { length: 20 })
    headrest_type: string; // Integrated, Adjustable Pillow

    @OneToOne(() => products, (products) => products.gamingchairDescription)
    @JoinColumn({ name: 'productId' })
    product: products;
}