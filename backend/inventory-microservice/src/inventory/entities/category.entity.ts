import { Column, PrimaryGeneratedColumn,OneToMany, Entity } from "typeorm";
import { products } from "./products.entity";


@Entity()
export class category{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @OneToMany(()=>products,(products=>products.category),{})
    products:products[]
}