import { Body, Controller, Get, Headers, Param, Post, Query, RequestMethod, Res,Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginBodyDTO } from "./dto/login.dto";
import { responseService } from "../shared/response.service";
import type { Request as expressRequest, Response } from "express";
import { registerDTO } from "./dto/register.dto";
import { registerManagerDTO } from "./dto/registerManager";



type loginResponse={

    statusCode:number,
   success:boolean,
   message:string,
   payload?:object

}
type refreshResponse={

    statusCode:number,
   success:boolean,
   message:string,
   payload?:object

}
type rolesType={
    userId:number,
    admin:boolean,
    manager:boolean,
    customer:boolean
}
type fallbackResponse={
    name:string,
    email:string,
    accessToken:string,
    roles:rolesType
}

@Controller('auth')
export class authController{

    constructor(
        private readonly authService:AuthService,
        private readonly responseService:responseService
    ){}


    @Post('register')
    async register(
        @Body() registerBody:registerDTO,
    ){
        return await this.authService.register(registerBody)
    }

    @Post('register-manager')
    async registerManager(
        @Body() registerBody:registerManagerDTO,
    ){
        return await this.authService.registerManager(registerBody)
    }

    @Post('login')
    async login(@Body() loginBody: loginBodyDTO,
    @Query('redirect') redirect:string
):Promise<loginResponse>{
    console.log('working')
        return await this.authService.login(loginBody,redirect)
        
    }

    @Get('/fallback')
    async fallback(
        @Query('token') token:string,
        @Res({passthrough:true}) response:Response
    ):Promise<fallbackResponse>{
        const result=await this.authService.fallback(token)

        response.cookie("refresh",result.refreshToken,{httpOnly:true, maxAge:24*60*60*1000})

        return {
            name:result.name,
            email:result.email,
            accessToken:result.accessToken,
            roles:result.roles
        }
        
    }
    @Get('/EmployeeRegisterFallback')
    async EmployeeRegisterfallback(
        @Query('token') token:string,
    ):Promise<loginResponse>{
        
        
        return await this.authService.employeeRegisterFallback(token)
    }
    @Get('/refresh')
    async refresh(
      @Request() req:expressRequest
    ){
        
        
        return await this.authService.refresh(req)
    }
}