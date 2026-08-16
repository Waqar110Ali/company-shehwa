// apps/api/src/updates/schemas/updates-content.schema.ts
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
export class UpdatesContent {

  @Prop({
    type: Object,
    required: true,
  })
  content!: Record<string, any>;
}

export type UpdatesContentDocument =
  HydratedDocument<UpdatesContent>;

export const UpdatesContentSchema =
  SchemaFactory.createForClass(
    UpdatesContent,
  );