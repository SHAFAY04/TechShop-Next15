import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ChannelPrice{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    productId:number

    @Column()
    salesChannelId:number

    @Column({length:120, nullable:true})
    salesChannelName:string | null

    @Column({type:'decimal', precision:10, scale:2})
    listPrice:number

    @Column({length:5, nullable:true})
    currencyCode:string | null

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date
}

