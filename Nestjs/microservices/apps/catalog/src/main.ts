import { Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module';

async function bootstrap() {
  process.title = 'catalog';

  const logger = new Logger('CatalogBootstrap');

  const rmqurl = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672';

  const queue = process.env.CATALOG_QUEUE ?? 'catalog_queue';

  //create an microservices instances
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rmqurl],
        queue,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.enableShutdownHooks();

  await app.listen();

  logger.log(`Catalog RMQ listen on queue ${queue} via ${rmqurl}`);
}

bootstrap();
