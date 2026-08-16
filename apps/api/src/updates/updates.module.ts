// apps/api/src/updates/updates.module.ts
import {
  Module,
} from "@nestjs/common";

import {
  MongooseModule,
} from "@nestjs/mongoose";

import {
  UpdatesController,
} from "./controllers/updates.controller";

import {
  UpdatesService,
} from "./services/updates.service";

import {
  UpdatesRepository,
} from "./repositories/updates.repository";

import {
  UpdatesContent,
  UpdatesContentSchema,
} from "./schemas/updates-content.schema";

import {
  CloudinaryModule,
} from "@/common/cloudinary/cloudinary.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UpdatesContent.name,
        schema: UpdatesContentSchema,
      },
    ]),

    CloudinaryModule,
  ],

  controllers: [
    UpdatesController,
  ],

  providers: [
    UpdatesService,
    UpdatesRepository,
  ],

  exports: [
    UpdatesService,
  ],
})
export class UpdatesModule {}