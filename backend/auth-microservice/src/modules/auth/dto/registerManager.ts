import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { userRolesDto } from "./userRoles.dto";



export class registerManagerDTO{

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsEmail()
    adminEmail:string

    @IsNotEmpty()
    @IsString()
    adminName:string

    @ValidateNested()
    @Type(()=>userRolesDto)
    roles:userRolesDto
}