import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import {
  HydratedDocument,
  Types,
} from "mongoose";

import { Conversation } from "./conversation.schema";
import { Employee } from "../../employees/schemas/employee.schema";

import { MessageType, CallLogStatus } from "../enums/message-status.enum";

export type MessageDocument =
  HydratedDocument<Message>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Message {
  @Prop({
    type: Types.ObjectId,
    ref: Conversation.name,
    required: true,
    index: true,
  })
  conversation!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Employee.name,
    required: true,
    index: true,
  })
  sender!: Types.ObjectId;

  @Prop({
    enum: MessageType,
    default: MessageType.TEXT,
    required: true,
  })
  type!: MessageType;

  @Prop({
    trim: true,
    maxlength: 5000,
    default: "",
  })
  content!: string;

  @Prop({
    trim: true,
    default: "",
  })
  attachment!: string;

  @Prop({
    trim: true,
    default: "",
  })
  fileName!: string;

  @Prop({
    default: 0,
  })
  fileSize!: number;

  @Prop({
    type: Types.ObjectId,
    ref: Message.name,
    default: null,
  })
  replyTo?: Types.ObjectId;

  @Prop({
    default: false,
  })
  edited!: boolean;

  @Prop({
    default: null,
  })
  editedAt?: Date;

  @Prop({
    default: false,
  })
  deleted!: boolean;

  @Prop({
    default: null,
  })
  deletedAt?: Date;

  @Prop({
    default: false,
  })
  read!: boolean;

  @Prop({
    default: null,
  })
  readAt?: Date;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: Employee.name,
      },
    ],
    default: [],
  })
  seenBy!: Types.ObjectId[];

  @Prop({
    type: [
      {
        emoji: {
          type: String,
        },
        employee: {
          type: Types.ObjectId,
          ref: Employee.name,
        },
      },
    ],
    default: [],
  })
  reactions!: {
    emoji: string;
    employee: Types.ObjectId;
  }[];

  /**
   * Call log fields.
   *
   * Only populated when `type` is AUDIO_CALL or VIDEO_CALL.
   * callStatus describes the outcome of the call, and
   * callDuration (seconds) is only meaningful when the
   * outcome is COMPLETED.
   */
  @Prop({
    enum: CallLogStatus,
    default: null,
  })
  callStatus?: CallLogStatus;

  @Prop({
    default: 0,
  })
  callDuration!: number;

  createdAt!: Date;
  updatedAt!: Date;
}

export const MessageSchema =
  SchemaFactory.createForClass(Message);

MessageSchema.index({
  conversation: 1,
  createdAt: 1,
});

MessageSchema.index({
  sender: 1,
});

MessageSchema.index({
  read: 1,
});

MessageSchema.index({
  deleted: 1,
});

MessageSchema.index({
  conversation: 1,
  read: 1,
});