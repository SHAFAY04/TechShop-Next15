import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { salesChannel } from "./salesChannel.entity";
import { products } from "./products.entity";
products

@Entity()
export class channelProducts{

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