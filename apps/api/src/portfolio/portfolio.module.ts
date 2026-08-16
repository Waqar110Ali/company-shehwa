// apps/api/src/portfolio/portfolio.module.ts
import {
  Module,
} from "@nestjs/common";

import {
  MongooseModule,
} from "@nestjs/mongoose";

import {
  PortfolioController,
} from "./controllers/portfolio.controller";

import {
  PortfolioService,
} from "./services/portfolio.service";

import {
  PortfolioRepository,
} from "./repositories/portfolio.repository";

import {
  PortfolioContent,
  PortfolioContentSchema,
} from "./schemas/portfolio.schema";

import {
  CloudinaryModule,
} from "@/common/cloudinary/cloudinary.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PortfolioContent.name,
        schema: PortfolioContentSchema,
      },
    ]),

    CloudinaryModule,
  ],

  controllers: [
    PortfolioController,
  ],

  providers: [
    PortfolioService,
    PortfolioRepository,
  ],

  exports: [
    PortfolioService,
  ],
})
export class PortfolioModule {}