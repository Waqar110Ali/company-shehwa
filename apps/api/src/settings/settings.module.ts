// apps/api/src/settings/settings.module.ts
import {
  Module,
} from "@nestjs/common";

import {
  MongooseModule,
} from "@nestjs/mongoose";

import {
  SettingsController,
} from "./controllers/settings.controller";

import {
  SettingsService,
} from "./services/settings.service";

import {
  SettingsRepository,
} from "./repositories/settings.repository";

import {
  UserSettingsDoc,
  UserSettingsSchema,
} from "./schemas/user-settings.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserSettingsDoc.name,
        schema: UserSettingsSchema,
      },
    ]),
  ],

  controllers: [
    SettingsController,
  ],

  providers: [
    SettingsService,
    SettingsRepository,
  ],

  exports: [
    SettingsService,
  ],
})
export class SettingsModule {}