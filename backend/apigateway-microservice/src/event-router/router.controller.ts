import { Controller, Inject, Logger } from "@nestjs/common";
import { EventPattern, Payload, Ctx, RmqContext, ClientProxy } from "@nestjs/microservices";
import { Channel, ChannelModel, ConfirmChannel, connect, Connection } from "amqplib";

@Controller()
export class RouterController {
  private readonly logger = new Logger(RouterController.name);
  private getCreateConfirmChannelMethodFromTheChannelModelInterface: ChannelModel;
  //ConfirmChannel extends Channel it basically overrides the publish method to add a callback so that you can wrap your event in a promise just wait for the event and either resolve or reject it
  //or you can use the waitForCOnfirms method which is basically an easier option you can just publish your event without the callback and call the
  //waitForConfirms method so that it can make the event process succesfully before proceeding to next lines of code.
  private confirmChannel: ConfirmChannel;

  constructor(  
    @Inject('OUTBOUND_EXCHANGE') private readonly outboundExchangeClient: ClientProxy,
  ) {}

  async onModuleInit() {
    try {
      this.logger.log(' Connecting to RabbitMQ for publishing...');
      
      // when we call this connect function it returns a promise of type ChannelModel so here we are awaiting that promise and saving the result in the
      //form of getCreateConfirmChannelMethodFromTheChannelModelInterface variable so that we can then use the createChannel method from ChannelModel.
      this.getCreateConfirmChannelMethodFromTheChannelModelInterface = await connect(
        'amqps://utosfroo:PfjO9mwgwxgbRx8PdRR2ZMHVIxyyQ0qD@gorilla.lmq.cloudamqp.com/utosfroo'
      );
      // here we are using that createChannel method because it returns a promise of type Channel and we are awaiting that to get Channel into
      //our confirmChannel variable so that we can get all useful methods like the method of assertExchange to send our events to specific exchanges
      // and the method of publish which helps you send the event and the waitForConfirm method which waits for your event to process before proceeding.
      this.confirmChannel = await this.getCreateConfirmChannelMethodFromTheChannelModelInterface.createConfirmChannel()
      
      //this is jjust a security confirmation step to see if the exchange does exist. if not it createss it for you.np
      await this.confirmChannel.assertExchange(
        'events_outbound.public.outbox',
        'topic',
        { durable: true }
      );
      
      this.logger.log('Publisher channel ready');
    } catch (error) {
      this.logger.error(' Failed to setup publisher:', error);
      throw error;
    }
  }

  @EventPattern() 
  async handleDebeziumEvent(
    @Payload() event: any,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const msg = context.getMessage();
    
    try {
      const fullEvent = event;
      const pattern = fullEvent?.after?.pattern;
      const payload = fullEvent?.after?.payload;

      this.logger.log(` Received: pattern=${pattern}`);

      if (!pattern) {
        this.logger.error(' No pattern - DLQ');
        channel.nack(msg, false, false);
        return;
      }

      if (!payload) {
        this.logger.error(' No payload - DLQ');
        channel.nack(msg, false, false);
        return;
      }

      this.logger.log(` Publishing [${pattern}] to exchange`);
      
      // NestJS RabbitMQ transport expects messages in a specific format with pattern metadata
      // Format: { pattern: 'routing.key', data: { ...payload } }
      const nestjsMessage = {
        pattern: pattern,
        data: payload
      };
      
      //you gotta do buffer.from (Json.stringify) because amqp is a binary protocol which doesnt understand json and shit so you gotta send it in
      //binary form 
      this.confirmChannel.publish(
        'events_outbound.public.outbox',
        pattern,
        Buffer.from(JSON.stringify(nestjsMessage)),
        { 
          persistent: true,
          contentType: 'application/json'
        }
      );

      await this.confirmChannel.waitForConfirms();
      
      this.logger.log(` Published [${pattern}] - confirmed`);
      channel.ack(msg);

    } catch (error) {
      this.logger.error(' Publish error:', error.message);
      channel.nack(msg, false, true);
    }
  }

  async onModuleDestroy() {
    await this.confirmChannel?.close();
    await this.getCreateConfirmChannelMethodFromTheChannelModelInterface?.close();
    this.logger.log(' Publisher getCreateConfirmChannelMethodFromTheChannelModelInterface closed');
  }
}