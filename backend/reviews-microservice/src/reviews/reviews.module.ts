import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { reviews } from './entities/reviews.entity';


@Module({
    imports:[TypeOrmModule.forFeature([reviews])],
    controllers:[],
    providers:[]
})
export class ReviewsModule {}
