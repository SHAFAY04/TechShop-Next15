import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pricingController } from './pricing.controller';
import { pricingService } from './pricing.service';
import { BasePrices } from './entities/baseprices.entity';
import { RegionCurrencyTax } from './entities/regionCurrencyTaxes.entity';
import { ProductDiscount } from './entities/productSpecificDiscounts.entity';
import { RegionDiscount } from './entities/regionDiscount.entity';
import { Voucher } from './entities/vouchers.entity';

@Module({
    imports:[TypeOrmModule.forFeature([BasePrices,RegionCurrencyTax,ProductDiscount,RegionDiscount,Voucher])],
    controllers:[pricingController],
    providers:[pricingService],
    exports:[]

})
export class PricingModule {}
