import { Body, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginBodyDTO } from "./dto/login.dto";
import { responseService } from "../shared/response.service";
import type { Response } from "express";


type loginResponse={

    statusCode:number,
   success:boolean,
   message:string,
   payload?:object

}
type fallbackResponse={
    accessToken:string,
    refreshToken:string
}

@Controller('auth')
export class authController{

    constructor(
        private readonly authService:AuthService,
        private readonly responseService:responseService
    ){}

    @Post()
    async login(@Body() loginBody: loginBodyDTO,
    @Query('redirect') redirect:string
):Promise<loginResponse>{

        return await this.authService.login(loginBody,redirect)
        
    }

    @Get('/fallback')
    async fallback(
        @Query('token') token:string,
        @Res({passthrough:true}) response:Response
    ){
        const result=await this.authService.fallback(token)

        response.cookie("refresh",result.refreshToken,{httpOnly:true, maxAge:24*60*60*1000})

        return {
            accessToken:result.accessToken
        }
        
    }
}