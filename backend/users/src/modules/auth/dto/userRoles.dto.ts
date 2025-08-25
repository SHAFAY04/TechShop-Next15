import { IsBoolean } from "class-validator";

export class userRolesDto{


    @IsBoolean()
    customer:boolean

    @IsBoolean()
    manager:boolean
}