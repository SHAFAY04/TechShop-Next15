import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform:true,
    whitelist:true,
    forbidNonWhitelisted:true
  }))

  app.connectMicroservice<MicroserviceOptions>({
    transport:Transport.RMQ,
    options:{
      urls:[
        'amqps://utosfroo:PfjO9mwgwxgbRx8PdRR2ZMHVIxyyQ0qD@gorilla.lmq.cloudamqp.com/utosfroo',
      ],
      queue:'reviews_queue',
      noAck: false, // <--- THIS IS STILL MANDATORY HERE
    queueOptions: {
      durable: true,
      arguments: {
        'x-dead-letter-exchange': 'retry.exchange', // Tell the queue where to send dead letters,
        'x-dead-letter-routing-key': 'reviews_retry'
      },
    },}
  },
)

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3004);
}
bootstrap();
