import { Body, ContextType, Controller, HttpCode, Inject, Logger, Post } from "@nestjs/common";
import { Ctx, EventPattern, Payload,RmqContext } from "@nestjs/microservices";
import { reviewsService } from "./reviews.service";
import { PostReviewDTO } from "./dto/postReview.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Outbox } from "./entities/reviewsOutbox.entity";

@Controller()
export class reviewsController{
  private readonly logger = new Logger(reviewsService.name)

    constructor(
      
        private readonly reviewsService:reviewsService,
        @InjectRepository(Outbox)
        private readonly ReviewsOutboxRepo: Repository<Outbox>

    ){}

    
    @Post('/create')
    @HttpCode(202)
    async productCreated(
      @Body() payload:PostReviewDTO
    ){

        try {

          const query=  this.ReviewsOutboxRepo.create({pattern:'review.created',payload:payload,status:'PENDING'})
          await this.ReviewsOutboxRepo.save(query)
            
          
        } catch (error) {
          
          this.logger.error('Failed to save to Outbox', error);
                    throw error
        }


        //returning instantly so that we can process this review in background
        return {
          message: 'Review submission accepted and is being processed.',
          timestamp: new Date().toISOString(),
        };
    }


    @EventPattern('review.created')
    async processReviewCreation(
      @Payload() event:any,
      @Ctx() context:RmqContext
    ){
      await this.reviewsService.createReview(event,context)
    }

    @EventPattern('product.deleted') 
    async processDeletedProduct(
    @Payload() event: any,
    @Ctx() context: RmqContext,
  ) {

    this.reviewsService.onProductDelete(event,context)

  }

}