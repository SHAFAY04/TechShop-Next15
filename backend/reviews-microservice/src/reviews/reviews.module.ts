import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { reviews } from './entities/reviews.entity';
import { reviewsController } from './reviews.controller';
import { reviewsService } from './reviews.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports:[
        TypeOrmModule.forFeature([reviews]),
        ClientsModule.register([
            {
                name:'NOTIFICATIONS_SERVICE',
                transport:Transport.RMQ,
                options:{
                    urls:[
                        'amqps://utosfroo:PfjO9mwgwxgbRx8PdRR2ZMHVIxyyQ0qD@gorilla.lmq.cloudamqp.com/utosfroo',
                    ],
                    queue:'notifications_queue',
                    queueOptions:{
                        durable:true
                    }
                }
            }
        ])
    ],
    controllers:[reviewsController],
    providers:[reviewsService]
})
export class ReviewsModule {}
