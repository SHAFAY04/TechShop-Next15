import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    url:"postgresql://neondb_owner:npg_yC27WEQSgmdP@ep-falling-wildflower-a1vtgvk2-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
    synchronize:true,

  }), ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
