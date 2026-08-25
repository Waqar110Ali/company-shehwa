import {
  ForbiddenException,
  Injectable,
  NotFoundException, Inject } from "@nestjs/common";

import { ChatRepository } from "../repository/chat.repository";
import { ChatMapper } from "../mapper/chat.mapper";
import { ChatGateway } from "../gateway/chat.gateway";

import { EmployeesRepository } from "../../employees/repositories/employees.repository";
import { ConversationFilterDto } from "../dto/conversation-filter.dto";
import { MessageFilterDto } from "../dto/message-filter.dto";
import { CreateConversationDto } from "../dto/create-conversation.dto";
import { SendMessageDto } from "../dto/send-message.dto";
import { UpdateMessageDto } from "../dto/update-message.dto";
import { Types } from "mongoose";
import { CloudinaryService } from "@/common/cloudinary/cloudinary.service";
import { MessageType } from "../enums/message-status.enum";
@Injectable()
export class ChatService {
  constructor(
  @Inject(ChatRepository) private readonly repository: ChatRepository,

  @Inject(EmployeesRepository) private readonly employeesRepository: EmployeesRepository,

  @Inject(ChatMapper) private readonly mapper: ChatMapper,

  @Inject(ChatGateway) private readonly gateway: ChatGateway,

  @Inject(CloudinaryService) private readonly cloudinary: CloudinaryService,
) {}

  // =====================================================
  // Conversations
  // =====================================================

async conversations(
  userId: string,
  filter: ConversationFilterDto,
) {
  const employeeId =
    await this.getEmployeeId(userId);

  const result =
    await this.repository.findUserConversations(
      employeeId,
      filter,
    );

  return this.mapper.toConversationList(
    result,
    employeeId,
  );
}
 async createConversation(
  userId: string,
  dto: CreateConversationDto,
) {
  const employeeId =
    await this.getEmployeeId(userId);

  if (
    employeeId ===
    dto.participantId
  ) {
    throw new ForbiddenException(
      "You cannot create a conversation with yourself.",
    );
  }

  const participant =
    await this.employeesRepository.findById(
      dto.participantId,
    );

  if (!participant) {
    throw new NotFoundException(
      "Employee not found.",
    );
  }

  let conversation =
    await this.repository.findConversationBetweenUsers(
      employeeId,
      dto.participantId,
    );

  if (!conversation) {
    const created =
      await this.repository.createConversation([
        employeeId,
        dto.participantId,
      ]);

      conversation =
        await this.repository.findConversationById(
          created.id,
        );
  }

  return this.mapper.toConversation(
    conversation!,
    employeeId,
  );
}
    // =====================================================
  // Messages
  // =====================================================

 async messages(
  userId: string,
  conversationId: string,
  filter: MessageFilterDto,
) {
  console.log("conversationId from controller:");
  console.log(conversationId);

  const employeeId =
    await this.getEmployeeId(userId);

  const conversation =
    await this.repository.findConversationById(
      conversationId,
    );

  if (!conversation) {
    throw new NotFoundException(
      "Conversation not found.",
    );
  }

  const participants =
    conversation.participants as any[];

  const isParticipant =
    participants.some(
      (participant) =>
        participant._id.toString() ===
        employeeId,
    );

  if (!isParticipant) {
    throw new ForbiddenException(
      "You are not a participant of this conversation.",
    );
  }

  const result =
    await this.repository.findMessages(
      conversationId,
      filter,
    );

  return this.mapper.toMessageList(
    result,
    employeeId,
  );
}

 async sendMessage(
  userId: string,
  dto: SendMessageDto,
) {
  const employeeId =
    await this.getEmployeeId(userId);

  const conversation =
    await this.repository.findConversationById(
      dto.conversationId,
    );

  if (!conversation) {
    throw new NotFoundException(
      "Conversation not found.",
    );
  }

  const participants =
    conversation.participants as any[];

  const isParticipant =
    participants.some(
      (participant) =>
        participant._id.toString() ===
        employeeId,
    );

  if (!isParticipant) {
    throw new ForbiddenException(
      "You are not a participant of this conversation.",
    );
  }
console.log("======================");
console.log("DTO RECEIVED");
console.log(dto);
console.log("fileName =", dto.fileName);
console.log("fileSize =", dto.fileSize);
console.log("attachment =", dto.attachment);
console.log("======================");
console.log("SAVED MESSAGE");


  const message =
    await this.repository.createMessage({
      conversation:
        new Types.ObjectId(
          dto.conversationId,
        ),

      sender:
        new Types.ObjectId(
          employeeId,
        ),

      type:
        dto.type,

      content:
        dto.content ?? "",

      attachment:
        dto.attachment ?? "",

      fileName:
        dto.fileName ?? "",

      fileSize:
        dto.fileSize ?? 0,

      replyTo:
        dto.replyTo
          ? new Types.ObjectId(
              dto.replyTo,
            )
          : undefined,
    });

  let lastMessage =
    dto.content;

  switch (dto.type) {
    case MessageType.IMAGE:
      lastMessage =
        dto.content?.trim()
          ? `📷 ${dto.content}`
          : "📷 Photo";
      break;

    case MessageType.FILE:
      lastMessage =
        dto.fileName
          ? `📄 ${dto.fileName}`
          : "📄 File";
      break;

    case MessageType.VOICE:
      lastMessage =
        "🎤 Voice message";
      break;

    case MessageType.TEXT:
    default:
      lastMessage =
        dto.content;
      break;
  }

  await this.repository.updateConversationLastMessage(
    dto.conversationId,
    lastMessage,
  );

  const populated =
    await this.repository.findMessageById(
      message.id,
    );

  if (!populated) {
    throw new NotFoundException(
      "Message not found after creation.",
    );
  }

  const response =
    this.mapper.toMessage(
      populated,
      employeeId,
    );

  this.gateway.emitMessage(
    dto.conversationId,
    response,
  );

  return response;
}
  async updateMessage(
    userId:string,
    messageId: string,
    dto: UpdateMessageDto,
  ) {
    const employeeId =
  await this.getEmployeeId(userId);

    const message =
      await this.repository.findMessageById(
        messageId,
      );

    if (!message) {
      throw new NotFoundException(
        "Message not found.",
      );
    }

    const sender =
      message.sender as any;

    if (
      sender._id.toString() !==
      employeeId
    ) {
      throw new ForbiddenException(
        "You can edit only your own messages.",
      );
    }

    const updated =
      await this.repository.updateMessage(
        messageId,
        dto.content,
      );

    if (!updated) {
      throw new NotFoundException(
        "Unable to update message.",
      );
    }

    const response =
      this.mapper.toMessage(
        updated,
        employeeId,
      );

    this.gateway.emitUpdatedMessage(
      response.conversation,
      response,
    );

    return response;
  }

  async deleteMessage(
    userId: string,
    messageId: string,
  ) {
    const employeeId =
  await this.getEmployeeId(userId);
    const message =
      await this.repository.findMessageById(
        messageId,
      );

    if (!message) {
      throw new NotFoundException(
        "Message not found.",
      );
    }

    const sender =
      message.sender as any;

    if (
      sender._id.toString() !==
      employeeId
    ) {
      throw new ForbiddenException(
        "You can delete only your own messages.",
      );
    }

    const deleted =
      await this.repository.deleteMessage(
        messageId,
      );

    if (!deleted) {
      throw new NotFoundException(
        "Unable to delete message.",
      );
    }

    const response =
      this.mapper.toMessage(
        deleted,
        employeeId,
      );

    this.gateway.emitDeletedMessage(
      response.conversation,
      response.id,
    );

    return response;
  }

  async markAsRead(
    conversationId: string,
    userId: string,
  ) {
    const employeeId =
  await this.getEmployeeId(userId);
    const conversation =
      await this.repository.findConversationById(
        conversationId,
      );

    if (!conversation) {
      throw new NotFoundException(
        "Conversation not found.",
      );
    }

    const participants =
      conversation.participants as any[];

    const isParticipant =
      participants.some(
        (participant) =>
          participant._id.toString() ===
          employeeId,
      );

    if (!isParticipant) {
      throw new ForbiddenException(
        "You are not a participant of this conversation.",
      );
    }

    await this.repository.markConversationAsRead(
      conversationId,
      employeeId,
    );

    this.gateway.emitConversationRead(
      conversationId,
      employeeId,
    );

    return {
      success: true,
    };
  }

  async unreadCount(
     userId: string,
  ) {
     const employeeId =
    await this.getEmployeeId(userId);

    const unread =
      await this.repository.getUnreadCount(
        employeeId,
      );

    return {
      unread,
    };
  }

  // =====================================================
// Upload
// =====================================================

async uploadFile(
  file: Express.Multer.File,
) {
  if (!file) {
    throw new NotFoundException(
      "No file uploaded.",
    );
  }

  const result: any =
    await this.cloudinary.uploadFile(
      file,
      "company-management/chat",
    );
    console.log(result);

  const isImage =
    file.mimetype.startsWith(
      "image/",
    );

  return {
    url: result.secure_url,

    publicId:
      result.public_id,

    fileName:
      file.originalname,

    fileSize:
      file.size,

    mimeType:
      file.mimetype,

    type: isImage
      ? "IMAGE"
      : "FILE",
  };
}

// =====================================================
// Helpers
// =====================================================

  private async getEmployeeId(
  userId: string,
): Promise<string> {
  const employee =
    await this.employeesRepository.findByUserId(
      userId,
    );

  if (!employee) {
    throw new NotFoundException(
      "Employee profile not found.",
    );
  }

  return employee._id.toString();
}
}