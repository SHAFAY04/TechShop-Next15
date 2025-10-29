import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],})

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

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
