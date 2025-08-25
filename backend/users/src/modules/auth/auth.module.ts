import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { user } from './entities/user.entity';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';
import { userRoles } from './entities/userRoles.entity';
import { authController } from './auth.controller';

@Module({
    imports:[TypeOrmModule.forFeature([user,userRoles]),SharedModule],
    controllers:[authController],
    providers:[AuthService]
})
export class AuthModule {}
