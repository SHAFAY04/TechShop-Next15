import {
    Entity,
    Column,
    PrimaryColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { products } from './products.entity';

@Entity('powersupply_descriptions')
export class PowersupplyDescription {
    @PrimaryColumn()
    productId: number;

    @Column('int')
    wattage: number;

    @Column('varchar', { length: 30 })
    efficiency_rating: string; // 80+ Gold, Platinum

    @Column('varchar', { length: 20 })
    modularity: string; // Fully Modular, Semi-Modular

    @Column('varchar', { length: 10 })
    form_factor: string; // ATX, SFX, SFX-L

    @Column('int')
    fan_size_mm: number;

    @Column('varchar', { length: 50 })
    eps_connectors: string; // e.g., '2x (4+4 pin)'

    @Column('varchar', { length: 50 })
    pcie_connectors: string; // e.g., '4x (6+2 pin)'

    @Column('int')
    warranty_years: number;

    @OneToOne(() => products, (products) => products.powersupplyDescription)
    @JoinColumn({ name: 'productId' })
    product: products;
}