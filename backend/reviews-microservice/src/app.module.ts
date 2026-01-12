import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsModule } from './reviews/reviews.module';
import { reviews } from './reviews/entities/reviews.entity';
import * as dotenv from "dotenv"

dotenv.config()

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    url:process.env.database_url,
    synchronize:true,
    entities: [reviews],
    autoLoadEntities: true, // This will auto-load entities from forFeature modules
  }), ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
