import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://utosfroo:PfjO9mwgwxgbRx8PdRR2ZMHVIxyyQ0qD@gorilla.lmq.cloudamqp.com/utosfroo',
        ],
        queue: 'pricing_queue',
        noAck: false, // <--- THIS IS STILL MANDATORY HERE
        queueOptions: {
          durable: true,
          arguments: {
            'x-dead-letter-exchange': 'retry.exchange', // Tell the queue where to send dead letters,
            'x-dead-letter-routing-key': 'pricing_retry'
          },
        }
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen();
}
bootstrap();
