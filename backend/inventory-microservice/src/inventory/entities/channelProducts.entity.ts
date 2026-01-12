import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { salesChannel } from "./salesChannel.entity";
import { products } from "./products.entity";

@Entity()
export class channelProducts{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    productId:number

    @Column()
    saleschannelId:number

    @Column()
    specificProductName:string

    @ManyToOne(()=>salesChannel,(salesChannel)=>salesChannel.channelProducts,{})
    @JoinColumn({name:'saleschannelId'})
    saleschannel:salesChannel

    @ManyToOne(()=>products,(products)=>products.channelProducts,{})
    @JoinColumn({name:'productId'})
    product:products
}