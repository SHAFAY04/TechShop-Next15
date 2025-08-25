import { MiddlewareConsumer, Module,NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import  cors from 'cors'
import * as dotenv from 'dotenv'
import { corsOptions } from 'src/common/config/corsOptions';

dotenv.config()

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    url:'postgresql://neondb_owner:npg_htDC3NFfWU6G@ep-silent-cherry-a15hctr2-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    autoLoadEntities: true,
    synchronize: true,
  }),AuthModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors(corsOptions)).forRoutes('*')
  }
}
