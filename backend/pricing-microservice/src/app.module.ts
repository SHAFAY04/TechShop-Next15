import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PricingModule } from './pricing/pricing.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from "dotenv"

dotenv.config()

@Module({
  imports: [PricingModule,TypeOrmModule.forRoot({
    type:"postgres",
    url:process.env.database_url,
    synchronize:true

  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
