import { Column, Entity, PrimaryColumn,OneToOne, JoinColumn} from "typeorm";
import { user } from "./user.entity";

@Entity()
export class userRoles{

    @PrimaryColumn()
    userId:number

    @Column()
    customer:boolean

    @Column()
    manager:boolean

    @OneToOne(()=>user,(user)=>user.roles,{})
    @JoinColumn({name:'userId'})
    user:user
}


