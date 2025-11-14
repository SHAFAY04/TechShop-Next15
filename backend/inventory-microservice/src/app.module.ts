import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import {TypeOrmModule} from "@nestjs/typeorm"
import * as dotenv from "dotenv"

dotenv.config()

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"postgres",
    synchronize:true,
    url:process.env.database_url
  }),InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {}
