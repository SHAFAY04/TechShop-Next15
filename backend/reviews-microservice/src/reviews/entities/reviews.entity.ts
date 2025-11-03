import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class reviews{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    productId:number

    @Column()
    userId:number

    @Column()
    userName:string

    @Column({nullable:true})
    comment:string

    @Column()
    stars:number

}