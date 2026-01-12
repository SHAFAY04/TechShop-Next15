import { Module } from '@nestjs/common';
import { RouterController } from './router.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'OUTBOUND_EXCHANGE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqps://utosfroo:PfjO9mwgwxgbRx8PdRR2ZMHVIxyyQ0qD@gorilla.lmq.cloudamqp.com/utosfroo'],
                    exchange: 'events_outbound.public.outbox',
                    exchangeType:'topic',
                    queue: '',
                    routingKey:'',
                    persistent: true,
                    queueOptions: {
                        durable: true,
                    },
                },
            },
        ]),
    ],
    controllers: [RouterController],
    providers: []
})
export class EventRouterModule {}
