import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const port = serverConfig.port;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  Logger.log(`Application Running On Port ${port}`);
}
bootstrap();
