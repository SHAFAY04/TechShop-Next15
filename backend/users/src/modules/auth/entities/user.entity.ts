import {Entity,Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, } from 'typeorm'
import { userRoles } from './userRoles.entity'

@Entity()
export class user{

    @PrimaryGeneratedColumn()
     id:number

    @Column({unique:true})
     email:string

    @Column()
     name:string

    @Column()
     refresh:string

     @OneToOne(()=>userRoles,(userRoles)=>userRoles.user,{})
     roles:userRoles
}