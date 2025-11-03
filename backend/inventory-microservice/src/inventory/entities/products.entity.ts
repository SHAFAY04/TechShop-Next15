import { Column, Entity, PrimaryGeneratedColumn,ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { category } from "./category.entity";
import { channelProducts } from "./channelProducts.entity";
import { MonitorarmsDescription } from "./armsDescription.entity";
import { GamingchairDescription } from "./chairsDescription.entity";
import { CPUDescription } from "./cpuDescription.entity";
import { GPUDescription } from "./gpuDescription.entity";
import { KeyboardDescription } from "./keyboardDescription.entity";
import { MouseDescription } from "./mouseDescription.entity";
import { PowersupplyDescription } from "./psuDescription.entity";
import { ScreenDescription } from "./screensDescription.entity";
import { productImage } from "./productImages.entity";

@Entity()
export class products{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    categoryId:number

    @Column()
    name:string

    @Column()
    description:string

    @ManyToOne(()=>category,(category)=>category.products,{})
    @JoinColumn({name:'categoryId'})
    category:category
    
    @OneToMany(()=>channelProducts,(channelProducts)=>channelProducts.product,{})
    channelProducts:channelProducts[]

    
    @OneToOne(() => MouseDescription, (mouseDescription) => mouseDescription.product)
    mouseDescription: MouseDescription;

   
    @OneToOne(() => KeyboardDescription, (keyboardDescription) => keyboardDescription.product)
    keyboardDescription: KeyboardDescription;

   
    @OneToOne(() => ScreenDescription, (screenDescription) => screenDescription.product)
    screenDescription: ScreenDescription;

 
    @OneToOne(() => PowersupplyDescription, (powersupplyDescription) => powersupplyDescription.product)
    powersupplyDescription: PowersupplyDescription;

   
    @OneToOne(() => CPUDescription, (cpuDescription) => cpuDescription.product)
    cpuDescription: CPUDescription;

 
    @OneToOne(() => GPUDescription, (gpuDescription) => gpuDescription.product)
    gpuDescription: GPUDescription;

    
    @OneToOne(() => GamingchairDescription, (gamingchairDescription) => gamingchairDescription.product)
    gamingchairDescription: GamingchairDescription;

  
    @OneToOne(() => MonitorarmsDescription, (monitorarmsDescription) => monitorarmsDescription.product)
    monitorarmsDescription: MonitorarmsDescription;

    @OneToMany(()=>productImage,(productImage)=>productImage.product,{})
    productImages:productImage[]
}