import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productsEntity } from './entities/products.entity';
import { inventoryController } from './inventory.controller';
import { inventoryService } from './inventory.service';

@Module({
    imports:[TypeOrmModule.forFeature([productsEntity])],
    controllers:[inventoryController],
    providers:[inventoryService],
    exports:[]
})
export class InventoryModule {}
