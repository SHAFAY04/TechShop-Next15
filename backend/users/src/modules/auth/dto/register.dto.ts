import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, ValidateNested } from "class-validator";
import { userRolesDto } from "./userRoles.dto";



export class registerDTO{

    @IsNotEmpty()
    @IsEmail()
    email:string

    @ValidateNested()
    @Type(()=>userRolesDto)
    roles:userRolesDto
}