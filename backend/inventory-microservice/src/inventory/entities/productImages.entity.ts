import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { products } from "./products.entity";

@Entity()
export class productImage{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    productId:number

    @Column()
    link:string

    @ManyToOne(()=>products,(products)=>products.productImages,{})
    @JoinColumn({name:'productId'})
    product:products

}