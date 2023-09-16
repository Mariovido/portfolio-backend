import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { configOpenAPI } from './config/config.swagger';
import { configCors } from './config/config.cors';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  app.enableCors(configCors);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  configOpenAPI(app);

  const host_port = process.env.HOST_PORT;
  await app.listen(host_port);
  logger.log(`Application listening on port ${host_port}`);
}
bootstrap();
