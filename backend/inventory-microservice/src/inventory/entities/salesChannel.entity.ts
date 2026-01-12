import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { channelProducts } from "./channelProducts.entity";


@Entity()
export class salesChannel{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    currency_code:string

    @OneToMany(()=>channelProducts,(channelProducts)=>channelProducts.saleschannel,{})
    channelProducts:channelProducts[]
}