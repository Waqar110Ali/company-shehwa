import { Injectable } from "@nestjs/common";

import {
  ConversationDocument,
} from "../schema/conversation.schema";

import {
  MessageDocument,
} from "../schema/message.schema";

@Injectable()
export class ChatMapper {
  // =====================================================
  // Conversation
  // =====================================================

  toConversation(
    conversation: ConversationDocument,
    currentEmployeeId: string,
  ) {
    const participants =
      conversation.participants as any[];

    const otherParticipant =
      participants.find(
        (employee) =>
          employee._id.toString() !==
          currentEmployeeId,
      );

    return {
      id:
        conversation._id.toString(),

      participant: {
        id:
          otherParticipant?._id?.toString(),

        employeeId:
          otherParticipant?.employeeId ?? "",

        userId:
          otherParticipant?.user?._id?.toString(),

        firstName:
          otherParticipant?.firstName ?? "",

        lastName:
          otherParticipant?.lastName ?? "",

        fullName:
          otherParticipant?.fullName ??
          `${otherParticipant?.firstName ?? ""} ${otherParticipant?.lastName ?? ""}`.trim(),

        avatar:
          otherParticipant?.avatar ?? "",

        designation:
          otherParticipant?.designation ?? "",

        department:
          otherParticipant?.department ?? "",

        status:
          otherParticipant?.status ?? null,

        online:
          otherParticipant?.online ?? false,
      },

      type:
        conversation.type,

      lastMessage:
        conversation.lastMessage ?? "",

      lastMessageAt:
        conversation.lastMessageAt,

      createdAt:
        conversation.createdAt,

      updatedAt:
        conversation.updatedAt,
    };
  }

  toConversationList(
    response: {
      items: ConversationDocument[];
      pagination: any;
    },
    currentEmployeeId: string,
  ) {
    return {
      items:
        response.items.map(
          (conversation) =>
            this.toConversation(
              conversation,
              currentEmployeeId,
            ),
        ),

      pagination:
        response.pagination,
    };
  }

  // =====================================================
  // Message
  // =====================================================

  toMessage(
    message: MessageDocument,
    currentEmployeeId?: string,
  ) {
    const sender =
      message.sender as any;

    return {
      id:
        message._id.toString(),

      userId:
        sender?.user?._id?.toString(),


      conversation:
        message.conversation.toString(),

      sender: {
        id:
          sender?._id?.toString(),

        firstName:
          sender?.firstName ?? "",

        lastName:
          sender?.lastName ?? "",

        fullName:
          sender?.fullName ??
          `${sender?.firstName ?? ""} ${sender?.lastName ?? ""}`.trim(),

        avatar:
          sender?.avatar ?? "",
      },

      type:
        message.type,

      content:
        message.content,

      attachment:
        message.attachment,

      fileName:
        message.fileName,

      fileSize:
        message.fileSize,

      /**
       * Call log fields — only meaningful when type is
       * AUDIO_CALL or VIDEO_CALL.
       */
      callStatus:
        message.callStatus ?? undefined,

      callDuration:
        message.callDuration ?? 0,

      edited:
        message.edited,

      editedAt:
        message.editedAt,

      deleted:
        message.deleted,

      deletedAt:
        message.deletedAt,

      read:
        message.read,

      readAt:
        message.readAt,

      replyTo:
        message.replyTo
          ? (message.replyTo as any)._id?.toString?.() ??
          message.replyTo.toString()
          : null,

      isMine:
        currentEmployeeId
          ? sender?._id?.toString() ===
          currentEmployeeId
          : false,

      createdAt:
        message.createdAt,

      updatedAt:
        message.updatedAt,
    };
  }

  toMessageList(
    response: {
      items: MessageDocument[];
      pagination: any;
    },
    currentEmployeeId?: string,
  ) {
    return {
      items:
        response.items.map(
          (message) =>
            this.toMessage(
              message,
              currentEmployeeId,
            ),
        ),

      pagination:
        response.pagination,
    };
  }
}