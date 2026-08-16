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
export class PortfolioContent {

  @Prop({
    type: Object,
    required: true,
  })
  content!: Record<string, any>;
}

export type PortfolioContentDocument =
  HydratedDocument<PortfolioContent>;

export const PortfolioContentSchema =
  SchemaFactory.createForClass(
    PortfolioContent,
  );