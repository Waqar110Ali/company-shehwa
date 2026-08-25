import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { join } from "path";
import {
  DocumentBuilder,
  SwaggerModule,
} from "@nestjs/swagger";

import { AppModule } from "../src/app.module";

let cachedApp: NestExpressApplication;

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
    );

  app.useStaticAssets(
    join(process.cwd(), "uploads"),
    {
      prefix: "/uploads/",
    },
  );

  app.setGlobalPrefix("api/v1");

  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("AI Company Management API")
    .setDescription("Enterprise Management System API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup("docs", app, document);

  await app.init();

  return app;
}

export default async function handler(
  req: any,
  res: any,
) {
  if (!cachedApp) {
    cachedApp = await bootstrap();
  }

  const instance = cachedApp.getHttpAdapter().getInstance();

  return instance(req, res);
}