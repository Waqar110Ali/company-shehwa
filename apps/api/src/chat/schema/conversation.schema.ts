import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import {
  HydratedDocument,
  Types,
} from "mongoose";

import { Employee } from "../../employees/schemas/employee.schema";
import { ConversationType } from "../enums/conversation-type.enum";

export type ConversationDocument =
  HydratedDocument<Conversation>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Conversation {
  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: Employee.name,
      },
    ],
    required: true,
    validate: {
      validator: (
        participants: Types.ObjectId[],
      ) => participants.length >= 2,
      message:
        "Conversation must contain at least two participants.",
    },
  })
  participants!: Types.ObjectId[];

  @Prop({
    type: String,
    enum: ConversationType,
    default: ConversationType.DIRECT,
  })
  type!: ConversationType;

  @Prop({
    type: String,
    trim: true,
    default: "",
  })
  lastMessage!: string;

  @Prop({
    type: Date,
    default: null,
  })
  lastMessageAt?: Date;

  createdAt!: Date;

  updatedAt!: Date;
}

export const ConversationSchema =
  SchemaFactory.createForClass(
    Conversation,
  );

/**
 * Find conversations for a user
 */
ConversationSchema.index({
  participants: 1,
});

/**
 * Sort newest first
 */
ConversationSchema.index({
  updatedAt: -1,
});

/**
 * Lookup between two users
 */
ConversationSchema.index({
  participants: 1,
  type: 1,
});