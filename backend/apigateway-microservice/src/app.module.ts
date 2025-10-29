import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import cors from 'cors'
import { corsOptions } from './common/corsConfig';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from './middlewares/jwt.middleware';

@Module({
  imports: [
    // Configure JwtModule so JwtMiddleware can inject and use JwtService
    JwtModule.register({
      secret: process.env.ACCESS_SECRET, 
      // Note: You need the secret here as well because jwtModule is supposed to be used by GUARDS and STRATEGIES but since we are going to use 
      //simply a custom JWTMiddlware then we have to use the jwtservice provided by this jwtModule. and jwtService will also get your secret to compare the token from here because you had to specify the secret while importing the jwtModule
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({ path: '', method: RequestMethod.ALL });
  }
  
  
}
