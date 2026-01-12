import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { pricingService } from "./pricing.service";

@Controller()
export class pricingController{
    
    constructor(
        private readonly pricingService:pricingService
    ){}

    @EventPattern('product.created')
    async handleProductCreated(@Payload() data:any, @Ctx() context:RmqContext){
        await this.pricingService.processProductCreated(data,context);
    }

  
}