import { NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

export class JwtMiddleware implements NestMiddleware{

    constructor(
        private readonly jwtservice:JwtService
    ){}

    use(req:Request,res:Response,next:NextFunction){

        const authHeader= req.headers.authorization

        if(!authHeader||!authHeader?.startsWith("Bearer ")){
            return new UnauthorizedException("Authentication token required!")
        }

        const token= authHeader.split(' ')[1]

        let payload;
        try {
            payload = this.jwtservice.verify(token)
      
            // Inject payload to the Express Request jo aage kisi microservice ke pas jayegi
            (req as any).user = payload 
            
      
            next();
          } catch (e) {
            throw new UnauthorizedException('Invalid or expired authentication token.');
          }
    }
}