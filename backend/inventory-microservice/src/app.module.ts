import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import {TypeOrmModule} from "@nestjs/typeorm"
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from "dotenv"

dotenv.config()

@Module({
  imports: [
    ClientsModule.register([
    {
      name: 'REVIEWS_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://utosfroo:PfjO9mwgwxgbRx8PdRR2ZMHVIxyyQ0qD@gorilla.lmq.cloudamqp.com/utosfroo',
        ],
        queue: 'reviews_queue',
        queueOptions: {
          durable: true, 
        },
      },
    },
    {
      name: 'PRICING_SERVICE',
      transport: Transport.RMQ,
      options: {
        //this is a fucking array, maybe this is the key to the microservice backup mythology where we put multiple queues so that if one instance of
        //a microservice goes down the other one takes over. but its not confirmed ill confirm
        urls: [
          'amqps://utosfroo:PfjO9mwgwxgbRx8PdRR2ZMHVIxyyQ0qD@gorilla.lmq.cloudamqp.com/utosfroo',
        ],
        queue: 'pricing_queue',
        queueOptions: {
          durable: true, 
        },
      },
    },
  ]),
  TypeOrmModule.forRoot({
    type:"postgres",
    synchronize:true,
    autoLoadEntities:true,
    url:`postgresql://neondb_owner:npg_n3R9LgrUAaxz@ep-royal-voice-a1ipj99m-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
  }),InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {}
