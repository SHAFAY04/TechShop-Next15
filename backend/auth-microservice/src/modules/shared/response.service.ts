import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";

type Response={

    statusCode:number,
   success:boolean,
   message:string,
   payload?:object

}
@Injectable()
export class responseService{

    sendResponse(resultObject:Response){

    if(resultObject.statusCode==404){
        throw new NotFoundException(resultObject.message)
    }
    if(resultObject.statusCode==500){
        throw new InternalServerErrorException(resultObject.message)
    }
        return resultObject
    
    }
}