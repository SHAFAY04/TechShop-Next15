import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { user } from './entities/user.entity';
import { AuthService } from './auth.service';
import { emailService } from 'src/modules/shared/email.service';
import { responseService } from '../shared/response.service';
import { SharedModule } from '../shared/shared.module';
import { userRoles } from './entities/userRoles.entity';

@Module({
    imports:[TypeOrmModule.forFeature([user,userRoles]),SharedModule],
    controllers:[],
    providers:[AuthService]
})
export class AuthModule {}
