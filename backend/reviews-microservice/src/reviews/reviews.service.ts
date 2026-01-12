import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { reviews } from "./entities/reviews.entity";
import { Repository } from "typeorm";
import { ClientProxy, Ctx, Payload, RmqContext } from "@nestjs/microservices";
import { Channel, ChannelModel, ConfirmChannel, connect, Connection } from "amqplib";

type reviewPayloadType={
    userId : number, 
    productId : number,
    userName : string,
    comment? : string,
    stars : number
}

@Injectable()
export class reviewsService implements OnModuleInit {

    private channelModel: ChannelModel
    private confirmChannel: ConfirmChannel
    private readonly logger = new Logger(reviewsService.name)

    constructor(
        @InjectRepository(reviews)
        private readonly reviewsRepo: Repository<reviews>
    ) {}

    async onModuleInit() {
        try {
            this.logger.log('🔌 Connecting to RabbitMQ for publishing...');
            // We connect once here so we don't spam connections later
            this.channelModel = await connect("amqps://utosfroo:PfjO9mwgwxgbRx8PdRR2ZMHVIxyyQ0qD@gorilla.lmq.cloudamqp.com/utosfroo")
            this.confirmChannel = await this.channelModel.createConfirmChannel()

            await this.confirmChannel.assertExchange(
                'global.deadletterexchange',
                "direct",
                { durable: true }
            )
            this.logger.log('Connected to channel successfully')
        } catch (error) {
            this.logger.error(' Could not connect on startup', error)
        }
    }

    async moveToDeadLetterQueue(originalMsg, reason: string, context: RmqContext) {

        const channel = context.getChannelRef()
        const payload = { originalMsg, reason }

        try {

            this.logger.log(` Publishing to DLQ`);

            this.confirmChannel.publish(
                'global.deadletterexchange',
                'reviews_error',
                originalMsg.content,
                {
                    persistent: true,
                    headers: {
                        ...originalMsg.properties.headers,
                        'x-error-reason': reason, // Now humans know WHY it's here
                        'x-failed-at': new Date().toISOString()
                    }
                }

            )

            await this.confirmChannel.waitForConfirms()
            this.logger.log(` Publish- confirmed`);

            channel.ack(originalMsg)


        } catch (error) {
            this.logger.error(' Publish error:', error.message);
            //retries the message instantly and keeps retrying until it doesnt reach global.deadletterexchange 
            //we cant do nack false false because it would send this event to the retry exchange as well and that would break things because this is
            //not a review event this is a failed review event which has to reach the global dead letter exchange anyhow.
            channel.nack(originalMsg, false, true);

        }


    }

    async createReview(payload: any, context: RmqContext){

        const channel = context.getChannelRef();
        const msg = context.getMessage();

        const Payload : reviewPayloadType= JSON.parse(payload)

        const {userId, productId, userName, comment , stars }=Payload


        
        
    }

    async onProductDelete(event: any, context: RmqContext) {

        const channel = context.getChannelRef();
        const msg = context.getMessage();

        // The router already extracted the payload, so event IS the payload
        // No need to extract from Debezium structure anymore
        const payload = JSON.parse(event);
        this.logger.log('payload ',payload)

        if ( !payload.id) {
            this.logger.error('id not found in payload', payload);
            await this.moveToDeadLetterQueue(msg, 'Id not found in payload', context);
            return;
        }
        if ( typeof payload.id==="string") {
            this.logger.error('id cant be of type string', payload);
            await this.moveToDeadLetterQueue(msg, 'Id cant be of type string', context);
            return;
        }

        try {
            this.logger.log(` Deleting all reviews for product: ${payload.id}`);
    
            // // FORCE A FAILURE HERE
            // throw new Error('SIMULATED DATABASE DOWN');

            // Perform the deletion
            const result = await this.reviewsRepo.delete({ productId: payload.id });
            
            this.logger.log(`Deleted ${result.affected} reviews.`);
            channel.ack(msg);
        } catch (error) {
            this.logger.error('Error deleting reviews:', error);
            //database was sleeping or the transaction failed for some reason
            channel.nack(msg, false, false);
        }
    }
}