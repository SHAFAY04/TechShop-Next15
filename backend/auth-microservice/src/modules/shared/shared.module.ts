import { Module } from '@nestjs/common';
import { emailService } from './email.service';
import { responseService } from './response.service';

@Module({
    providers:[emailService,responseService],
    exports:[emailService,responseService]
})
export class SharedModule {}
