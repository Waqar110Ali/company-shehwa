// import { NestFactory } from "@nestjs/core";
// import { NestExpressApplication } from "@nestjs/platform-express";
// import { ValidationPipe } from "@nestjs/common";
// import { join } from "path";
// import {
//   DocumentBuilder,
//   SwaggerModule,
// } from "@nestjs/swagger";

// import { AppModule } from "./app.module";

// async function bootstrap() {
//   const app =
//     await NestFactory.create<NestExpressApplication>(
//       AppModule,
//     );

//   // Serve uploaded files (e.g. employee avatars) at /uploads/...
//   // NOTE: this is NOT affected by setGlobalPrefix below — static
//   // assets are served by the underlying Express layer directly, so
//   // the URL stays http://localhost:5000/uploads/avatars/xyz.jpg,
//   // exactly matching what avatarPublicPath() builds.
//   app.useStaticAssets(
//     join(process.cwd(), "uploads"),
//     {
//       prefix: "/uploads/",
//     },
//   );

//   // Global API Prefix
//   app.setGlobalPrefix("api/v1");

//   app.enableCors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   });

//   app.useGlobalPipes(
//   new ValidationPipe({
//     whitelist: true,
//     transform: true,
//     forbidNonWhitelisted: true,
//     transformOptions: {
//       enableImplicitConversion: true,
//     },
//   }),
// );

//   const config = new DocumentBuilder()
//     .setTitle("AI Company Management API")
//     .setDescription("Enterprise Management System API")
//     .setVersion("1.0")
//     .addBearerAuth()
//     .build();

//   const document = SwaggerModule.createDocument(
//     app,
//     config,
//   );

//   SwaggerModule.setup(
//     "docs",
//     app,
//     document,
//   );

//   await app.listen(process.env.PORT ?? 5000);

//   console.log(
//     `🚀 Server running at http://localhost:${process.env.PORT}`,
//   );

//   console.log(
//     `📚 Swagger Docs: http://localhost:${process.env.PORT}/docs`,
//   );
// }

// bootstrap();


import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { join } from "path";
import {
  DocumentBuilder,
  SwaggerModule,
} from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
    );

  // Serve uploaded files (e.g. employee avatars) at /uploads/...
  app.useStaticAssets(
    join(process.cwd(), "uploads"),
    {
      prefix: "/uploads/",
    },
  );

  // Global API Prefix
  app.setGlobalPrefix("api/v1");

  // CORS
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  // Global validation
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

  // Swagger
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

  SwaggerModule.setup(
    "docs",
    app,
    document,
  );

  // Render provides PORT in production.
  // 5000 remains the local-development fallback.
  const port = process.env.PORT ?? 5000;

  await app.listen(port, "0.0.0.0");

  console.log(
    `🚀 Server running on port ${port}`,
  );

  console.log(
    `📚 Swagger Docs available at /docs`,
  );
}

bootstrap();