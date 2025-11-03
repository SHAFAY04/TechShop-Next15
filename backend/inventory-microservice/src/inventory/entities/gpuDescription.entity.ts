import {
    Entity,
    Column,
    PrimaryColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { products } from './products.entity';

@Entity('gpu_descriptions')
export class GPUDescription {
    @PrimaryColumn()
    productId: number;

    @Column('varchar', { length: 100 })
    gpu_chipset: string; // RTX 4070, RX 7800 XT

    @Column('int')
    vram_gb: number;

    @Column('varchar', { length: 10 })
    memory_type: string; // GDDR6X, GDDR6

    @Column('int')
    boost_clock_mhz: number;

    @Column('varchar', { length: 20 })
    interface: string; // PCIe 4.0 x16

    @Column('varchar', { length: 30 })
    cooling_type: string; // Triple Fan, Blower

    @Column('int')
    length_mm: number;

    @Column('varchar', { length: 50 })
    power_connectors: string; // e.g., '1x 16-pin, 2x 8-pin'

    @OneToOne(() => products, (products) => products.gpuDescription)
    @JoinColumn({ name: 'productId' })
    product: products;
}