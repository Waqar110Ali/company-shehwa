import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";

import { ChatController } from "./controller/chat.controller";
import { ChatService } from "./service/chat.service";
import { ChatRepository } from "./repository/chat.repository";
import { ChatMapper } from "./mapper/chat.mapper";
import { ChatGateway } from "./gateway/chat.gateway";

import {
  Conversation,
  ConversationSchema,
} from "./schema/conversation.schema";

import {
  Message,
  MessageSchema,
} from "./schema/message.schema";

import { EmployeesModule } from "../employees/employees.module";
import { CloudinaryModule } from "../common/cloudinary/cloudinary.module";

@Module({
  imports: [
    EmployeesModule,

    CloudinaryModule,

    MulterModule.register({
      limits: {
        fileSize: 25 * 1024 * 1024, // 25 MB
      },
    }),

    MongooseModule.forFeature([
      {
        name: Conversation.name,
        schema: ConversationSchema,
      },
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
  ],

  controllers: [
    ChatController,
  ],

  providers: [
    ChatService,
    ChatRepository,
    ChatMapper,
    ChatGateway,
  ],

  exports: [
    ChatService,
    ChatRepository,
    ChatGateway,
  ],
})
export class ChatModule {}