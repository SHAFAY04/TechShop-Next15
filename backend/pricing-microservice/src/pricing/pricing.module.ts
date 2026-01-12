import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pricingController } from './pricing.controller';
import { pricingService } from './pricing.service';
import { BasePrices } from './entities/baseprices.entity';
import { RegionCurrencyTax } from './entities/regionCurrencyTaxes.entity';
import { ProductDiscount } from './entities/productSpecificDiscounts.entity';
import { RegionDiscount } from './entities/regionDiscount.entity';
import { Voucher } from './entities/vouchers.entity';
import { ChannelPrice } from './entities/channelPrices.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports:[
        TypeOrmModule.forFeature([BasePrices,RegionCurrencyTax,ProductDiscount,RegionDiscount,Voucher,ChannelPrice]),
        ClientsModule.register([
            {
                name:'NOTIFICATIONS_SERVICE',
                transport:Transport.RMQ,
                options:{
                    urls:[
                        'amqps://utosfroo:PfjO9mwgwxgbRx8PdRR2ZMHVIxyyQ0qD@gorilla.lmq.cloudamqp.com/utosfroo',
                    ],
                    queue:'notifications_queue',
                    queueOptions:{
                        durable:true
                    }
                }
            }
        ])
    ],
    controllers:[pricingController],
    providers:[pricingService],
    exports:[]

})
export class PricingModule {}
