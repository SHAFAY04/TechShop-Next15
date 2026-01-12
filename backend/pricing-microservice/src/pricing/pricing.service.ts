import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BasePrices } from "./entities/baseprices.entity";
import {
    Repository,
    In,
    DataSource,
} from "typeorm";
import { RegionCurrencyTax } from "./entities/regionCurrencyTaxes.entity";
import { ProductDiscount } from "./entities/productSpecificDiscounts.entity";
import { RegionDiscount } from "./entities/regionDiscount.entity";
import { ChannelPrice } from "./entities/channelPrices.entity";
import { ClientProxy, RmqContext } from "@nestjs/microservices";

interface PricingProductCreatedEvent {
    productId: number;
    baseUsdPrice: number;
    channelPrices?: {
        salesChannelId: number;
        salesChannelName?: string | null;
        listPrice: number;
        currencyCode?: string | null;
    }[];
}


@Injectable()
export class pricingService {

    constructor(
        private readonly datasource:DataSource
    ) {}

    async processProductCreated(event: PricingProductCreatedEvent,context:RmqContext) {

        await this.datasource.manager.transaction(async(manager)=>{

            const channel=context.getChannelRef()
            const message=context.getMessage()
            const headers= message.properties.headers

            //x-death itself is an array 
            const deathHeader= headers['x-death']?.[0]

            const retryCount= deathHeader?deathHeader.count:0

            
        })
    }

    
    
}
