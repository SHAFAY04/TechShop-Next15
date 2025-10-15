import {Entity,Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Timestamp, CreateDateColumn, UpdateDateColumn, } from 'typeorm'
import { userRoles } from './userRoles.entity'

@Entity()
export class user{

    @PrimaryGeneratedColumn()
     id:number

    @Column({unique:true})
     email:string

    @Column()
     name:string

    @Column({nullable:true})
     refresh:string

     @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date; 

     @OneToOne(()=>userRoles,(userRoles)=>userRoles.user,{cascade: true})
     roles:userRoles
}