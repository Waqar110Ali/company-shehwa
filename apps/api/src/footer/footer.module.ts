import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { FooterController } from "./controllers/footer.controller";
import { FooterService } from "./services/footer.service";
import { FooterRepository } from "./repositories/footer.repository";
import { FooterContentDoc, FooterContentSchema } from "./schemas/footer-content.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FooterContentDoc.name, schema: FooterContentSchema },
    ]),
  ],
  controllers: [FooterController],
  providers: [FooterService, FooterRepository],
  exports: [FooterService],
})
export class FooterModule {}