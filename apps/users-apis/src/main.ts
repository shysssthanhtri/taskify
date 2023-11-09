/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { UserContract } from '@taskify/users-contracts';
import { initContract } from '@ts-rest/core';
import { generateOpenApi } from '@ts-rest/open-api';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/users';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT ?? 3000;

  const c = initContract();
  const document = generateOpenApi(
    c.router(
      {
        users: UserContract,
      },
      {
        pathPrefix: `/${globalPrefix}`,
      },
    ),
    {
      info: {
        title: 'Users APIs',
        version: '1.0.0',
      },
    },
    {
      setOperationId: true,
    },
  );

  SwaggerModule.setup([globalPrefix, 'docs'].join('/'), app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
