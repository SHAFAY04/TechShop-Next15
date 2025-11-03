import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import {TypeOrmModule} from "@nestjs/typeorm"

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"postgres",
    synchronize:true,
    url:'postgresql://neondb_owner:npg_n3R9LgrUAaxz@ep-royal-voice-a1ipj99m-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
  }),InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {}
