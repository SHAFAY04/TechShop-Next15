import { Injectable, Logger } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly gateway: NotificationsGateway) {}

  forward(event: string, payload: unknown) {
    this.logger.debug(`Forwarding event ${event}`);
    this.gateway.broadcast(event, payload);
  }
}

