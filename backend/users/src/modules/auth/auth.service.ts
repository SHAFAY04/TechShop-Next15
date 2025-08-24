import { GatewayTimeoutException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { user } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { loginBodyDTO } from "./dto/login.dto";
import { emailService } from "../shared/email.service";
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { userRoles } from "./entities/userRoles.entity";

dotenv.config()


type loginResponseDTO={

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

    async login(loginBody:loginBodyDTO,redirect:string):Promise<loginResponseDTO>{

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

        try{

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

            const accessSecret=process.env.ACCESS_SECRET!
            const accessToken= jwt.sign(foundUser,accessSecret,{expiresIn:'30s'})

            const refreshSecret=process.env.REFRESH_SECRET!
            const refreshToken=jwt.sign(foundUser,refreshSecret,{expiresIn:'1d'})

            const updateItem={
                refresh:refreshToken
            }
            try {
                await this.userRepo.update({id:foundUser.id},updateItem)

                return{
                    accessToken,
                    refreshToken
                }

            } catch (error) {
                throw new InternalServerErrorException('updating the user failed')
            }

           


        }
        catch(e){
            throw new UnauthorizedException('The token expired')
        }
        
    }
}