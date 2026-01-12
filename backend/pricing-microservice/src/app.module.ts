import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PricingModule } from './pricing/pricing.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from "dotenv"
import { ClientsModule, Transport } from '@nestjs/microservices';

dotenv.config()

@Module({
  imports: [PricingModule,TypeOrmModule.forRoot({
    type:"postgres",
    url:process.env.database_url,
    synchronize:true

  }),
  ClientsModule.register([{
    name:'NOTIFICATION_SERVICE',
    transport:Transport.RMQ,
    options:{
      queue:'notification_queue',
      urls:['amqps://utosfroo:PfjO9mwgwxgbRx8PdRR2ZMHVIxyyQ0qD@gorilla.lmq.cloudamqp.com/utosfroo'],
      queueOptions: {
        durable:true
      },
    }
  }])
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
