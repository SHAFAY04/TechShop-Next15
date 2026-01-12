import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }))

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })

  const services = [
    { path: '/api/auth', target: 'http://localhost:3002/auth' },
    { path: '/api/inventory', target: 'http://localhost:3003/inventory' },
  ];

  const express = app.getHttpAdapter().getInstance();
  services.forEach(service => {
    express.use(service.path, createProxyMiddleware({
      target: service.target,
      changeOrigin: true,
      pathRewrite: { [`^${service.path}`]: '' }
    }));
  });

  //I AM WRITING DOWN MY WHOLE EVENT ARCHITECTURE LOGIC HERE WE COULD SIMPLY USE EASY NESTJS EVENT EMIT BUT WE NEEDED EVENT PRESISTANCE.
  //we needed our event to never get lost in a case where you emit an event and before the consumer consumes it rabbit goes down so does the event
  //so for that we needed the outbox pattern and a change data logic CDC tool where we save an event to the database and the CDC TOOL like debezium
  //watches that database table logs actively and as a new row log comes in it just takes the data of that row and sends it to a rabbitMQ exchange
  //now this way even if rabbitMQ went down the CDC tool will resend the message as long as it doesnt get a confirmation from rabbitMQ now apigateway
  //is watching that exchange's queue named noroutingkey_queue as an event fells in that queue apigateway's event router controller catches it 
  //checks if the event is correct (it has a payload and pattern) and sends this event to the outbound exchange. now why we need an outbound exchange 
  //and not directly emitting events to queues from the router? and why do we need router in the first place????

  //look the thing is that for the outbox pattern you need a table right and when you save that event to the table you have a pattern column in your
  //table the easiest outbox pattern would be you just sending the event to the table with the pattern and the CDC tool like debezium reading your
  //pattern column and just emitting that event to a single exchange where literally all the queues are binded according to patterns and all the queues
  //can get it easy peasy but thats the shit thing with debezium and cdc tools they cant fucking read your pattern column and set the pattern 
  // as the routingkey of your event thats the whole fucking logic behind the need of a router..

  //now why we cant emit directly to queues from the router? because imagine if an event is a fanout event its product.deleted and lets say pricing queue
  //wants product.# and reviews queue want product.deleted they both want this event right imagine you will first introduce the fucking clientProxy hell.
  //because you will need to register every other queue in your apigateway and then you will literally need a bunch of if else statements if pattern is 
  //product.deleted send event to both pricingqueue clientproxy and reviewsqueue clientproxy while if its a product.created send it only to pricingqueue
  //imagine the amount of COUPLING this would introduce and even if we ignore coupling... then 1. noroutingkey_queue is bound with # you would run into
  //an infinite loop of events so you have to anyway seperate that inboundexchange whicch has that noroutingkey_queue. after that 2. forget about inbound
  // // outbout exchange for now what if you send an event this way through clientproxies based on the pattern like product.deleted you emit to both 
  // the pricingclientproxy and reviewsclientproxy and the event goes to both pricing queue and reviews queue and then further to pricing microservice and
  // reviews microservice and then imagine one of them events fail right for example pricingmicroservice processed it correctly
  // but it failed on reviewMicroservice due to xyz reason and since we have a retry_queue logic the event goes
  //  into the retry queue sits there for 10 mins after that its redirected back to the exchange with its initial pattern so that the message can go back
  // to whatever queue it belonged to in our case we would want to take the event back to reviewqueue only right so that review microservice can consume it
  // but since it has a product.deleted pattern it would go to pricingqueue as well causing event duplication because ofcourse both the queues were bound
// to that one exchange. (but you can easily fix this pattern by sending the event from the retry queue with the destination queue name as the pattern
// in this way the event directly goes to the destination queue ) 
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://utosfroo:PfjO9mwgwxgbRx8PdRR2ZMHVIxyyQ0qD@gorilla.lmq.cloudamqp.com/utosfroo',
      ],
      queue: 'noroutingkey_queue',
      noAck: false, //we have to send ack to the queue when the original queue confirms to the router that it has recieved the event 
      queueOptions: {
        durable: true,
        arguments: {
          'x-dead-letter-exchange': 'global.deadletterexchange',
          'x-dead-letter-routing-key': 'router.failed',
        }, 
      }
    }
  },
  )

  await app.startAllMicroservices();


  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
