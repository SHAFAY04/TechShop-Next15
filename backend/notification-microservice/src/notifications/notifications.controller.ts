import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('pricing.response.ready')
  handlePricingReady(@Payload() data: unknown) {
    this.notificationsService.forward('pricing.response.ready', data);
  }

  @EventPattern('reviews.response.ready')
  handleReviewsReady(@Payload() data: unknown) {
    this.notificationsService.forward('reviews.response.ready', data);
  }

  @EventPattern('review.rejected')
  handleReviewRejected(@Payload() data: unknown) {
    this.notificationsService.forward('review.rejected', data);
  }

  @EventPattern('review.accepted')
  handleReviewAccepted(@Payload() data: unknown) {
    this.notificationsService.forward('review.accepted', data);
  }
}

