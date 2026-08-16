// apps/api/src/settings/schemas/user-settings.schema.ts
import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import {
  HydratedDocument,
} from "mongoose";

@Schema({
  timestamps: true,
})
export class UserSettingsDoc {

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  userId!: string;

  @Prop({
    type: Object,
    required: true,
  })
  content!: Record<string, any>;
}

export type UserSettingsDocument =
  HydratedDocument<UserSettingsDoc>;

export const UserSettingsSchema =
  SchemaFactory.createForClass(
    UserSettingsDoc,
  );