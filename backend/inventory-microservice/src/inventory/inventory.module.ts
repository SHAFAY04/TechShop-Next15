import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { products} from './entities/products.entity';
import { MonitorarmsDescription } from './entities/armsDescription.entity';
import { category } from './entities/category.entity';
import { GamingchairDescription } from './entities/chairsDescription.entity';
import { channelProducts } from './entities/channelProducts.entity';
import { CPUDescription } from './entities/cpuDescription.entity';
import { GPUDescription } from './entities/gpuDescription.entity';
import { KeyboardDescription } from './entities/keyboardDescription.entity';
import { MouseDescription } from './entities/mouseDescription.entity';
import { productImage } from './entities/productImages.entity';
import { PowersupplyDescription } from './entities/psuDescription.entity';
import { salesChannel } from './entities/salesChannel.entity';
import { ScreenDescription } from './entities/screensDescription.entity';
import { inventoryController } from './inventory.controller';
import { inventoryService } from './inventory.service';

@Module({
    imports:[TypeOrmModule.forFeature([products,MonitorarmsDescription,category,GamingchairDescription,channelProducts,CPUDescription,GPUDescription,KeyboardDescription,MouseDescription,productImage,PowersupplyDescription,salesChannel,ScreenDescription])],
    controllers:[inventoryController],
    providers:[inventoryService],
    exports:[]
})
export class InventoryModule {}
