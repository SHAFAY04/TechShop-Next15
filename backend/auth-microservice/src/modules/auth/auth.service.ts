import { ConflictException, GatewayTimeoutException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { user } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { loginBodyDTO } from "./dto/login.dto";
import { emailService } from "../shared/email.service";
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { userRoles } from "./entities/userRoles.entity";
import { registerDTO } from "./dto/register.dto";
import { uniqueNamesGenerator } from "unique-names-generator";
import { customTechConfig } from '../../common/config/userNameGenConfig'
import { registerManagerDTO } from "./dto/registerManager";
import { JwtPayload } from "jsonwebtoken";

dotenv.config()


type ResponseDTO={

    statusCode:number,
    success:boolean,
    message:string,
}

@Injectable()
export class AuthService{

    constructor(
        @InjectRepository(user)
        private userRepo: Repository<user>,
        @InjectRepository(userRoles)
        private userRolesRepo:Repository<userRoles>,
        private readonly emailService:emailService
    ){}

    async register(registerBody:registerDTO,redirect?:string){

        const foundUser= await this.userRepo.findOne({
            where:{
                email:registerBody.email
            },
            relations:['roles']
        })
        
        if(foundUser){
            const  adminRole= foundUser.roles.admin
            const managerRole= foundUser.roles.manager
            const customerRole= foundUser.roles.customer

            if(adminRole){
                return this.emailService.sendLoginMail(registerBody,foundUser.name,redirect?redirect:'/admin')

            }
            if(managerRole){
                return this.emailService.sendLoginMail(registerBody,foundUser.name,redirect?redirect:'/manager')

            }
            if(customerRole){
                return this.emailService.sendLoginMail(registerBody,foundUser.name,redirect?redirect:'/home')

            }

        }
        const username = uniqueNamesGenerator(customTechConfig);
        const managerRole= registerBody.roles.manager
        const customerRole= registerBody.roles.customer

        try {
            
            const newuser=this.userRepo.create({name:username,email:registerBody.email,roles:registerBody.roles})
            await this.userRepo.save(newuser)
    
        } catch (error) {

            throw new InternalServerErrorException(error)
        }


        if(managerRole){
            return this.emailService.sendRegisterMail(registerBody, username, redirect?redirect:'/manager')

        }
        if(customerRole){
            return this.emailService.sendRegisterMail(registerBody, username, redirect?redirect:'/home')

        }

    }
    async registerManager(registerBody:registerManagerDTO){

        const foundUser= await this.userRepo.findOne({
            where:{
                email:registerBody.email
            },
            relations:['roles']
        })
        
        if(foundUser){
           throw new ConflictException('Manager already exists!')

        }
        const username = uniqueNamesGenerator(customTechConfig);

            return this.emailService.sendEmployeeRegisterMail(registerBody, username)

        

    }

    async login(loginBody:loginBodyDTO,redirect:string):Promise<ResponseDTO>{

       const foundUser= await this.userRepo.findOne({
            where:{
                email:loginBody.email
            }
        })
        
        if(!foundUser){
           throw new NotFoundException("user not found!")
        }
//The key point: Any function that uses await anywhere inside it automatically becomes async and returns a Promise. You can't escape this - it's how JavaScript works.
//So yes, you still need await to unwrap the Promise from the email service, even without explicitly typing the return as Promise<loginResponseDTO>.
        return this.emailService.sendLoginMail(loginBody,foundUser.name,redirect)


        
    }

    async fallback(token:string){

        const secret=process.env.FALLBACK_SECRET!
    
    try {
        const decoded=jwt.verify(token,secret) as jwt.JwtPayload
        const userEmail= decoded.email

        const foundUser= await this.userRepo.findOne({
            where:{
                email:userEmail
         
        },relations:['roles']
        })
        
        if(!foundUser){
           throw new NotFoundException("user not found!")
        }

        const payload={
            id:foundUser.id,
            name:foundUser.name,
            email:foundUser.email,
            roles:foundUser.roles
        }

        const accessSecret=process.env.ACCESS_SECRET!
        const accessToken= jwt.sign(payload,accessSecret,{expiresIn:'30s'})

        const refreshSecret=process.env.REFRESH_SECRET!
        const refreshToken=jwt.sign(payload,refreshSecret,{expiresIn:'1d'})

        const updateItem={
            refresh:refreshToken
        }
        try {
            await this.userRepo.update({id:foundUser.id},updateItem)

            return{
                
                name:foundUser.name,
                email:foundUser.email,
                roles:foundUser.roles,
                accessToken,
                refreshToken
            }

        } catch (error) {
            throw new InternalServerErrorException('updating the user failed')
        }
    } catch (error) {
        throw new Error(error)
    }
        
    }

    async employeeRegisterFallback(token:string){
        const secret=process.env.FALLBACK_SECRET!
    
        try {
            const decoded = jwt.verify(token, secret) as JwtPayload;

            // FIX: Corrected syntax by removing the trailing commas from the variable declarations.
            const { email: userEmail, username: userName, roles: userRoles } = decoded;
    
          
            try {
            
                const newuser=this.userRepo.create({name:userName,email:userEmail,roles:userRoles})
                await this.userRepo.save(newuser)
        
            } catch (error) {
    
                throw new InternalServerErrorException(error)
            }


        } catch (error) {
            throw new Error(error)
        }
        return {
            statusCode:200,
            success:true,
            message:"employee was registered"
        }
    }
   
}