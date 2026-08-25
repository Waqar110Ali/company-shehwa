import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors, Inject } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";

import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { Roles } from "@/auth/decorators/roles.decorator";
// import { Role } from "@/users/enums/role.enum";
import {
  VIEW_ROLES,
} from "@/auth/constants/role-groups";
import { ChatService } from "../service/chat.service";

import { ConversationFilterDto } from "../dto/conversation-filter.dto";
import { MessageFilterDto } from "../dto/message-filter.dto";
import { CreateConversationDto } from "../dto/create-conversation.dto";
import { SendMessageDto } from "../dto/send-message.dto";
import { UpdateMessageDto } from "../dto/update-message.dto";

@ApiTags("Chat")
@ApiBearerAuth()
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Controller("chat")
export class ChatController {
  constructor(
    @Inject(ChatService) private readonly service: ChatService,
  ) {}

  // =====================================================
  // Conversations
  // =====================================================

  @Get("conversations")
 @Roles(...VIEW_ROLES)
  conversations(
    @Req() req: any,
    @Query() filter: ConversationFilterDto,
  ) {
    return this.service.conversations(
      req.user.sub,
      filter,
    );
  }

  @Post("conversations")
  @Roles(...VIEW_ROLES)
  createConversation(
    @Req() req: any,
    @Body() dto: CreateConversationDto,
  ) {
    return this.service.createConversation(
      req.user.sub,
      dto,
    );
  }

  // =====================================================
  // Messages
  // =====================================================

  @Get(
    "conversations/:conversationId/messages",
  )
 @Roles(...VIEW_ROLES)
  messages(
    @Req() req: any,

    @Param("conversationId")
    conversationId: string,

    @Query()
    filter: MessageFilterDto,
  ) {
    return this.service.messages(
      req.user.sub,
      conversationId,
      filter,
    );
  }

  @Post("messages")
@Roles(...VIEW_ROLES)
async sendMessage(
  @Req() req: any,
  @Body() body: any,
) {
  console.log("============== SEND MESSAGE ==============");
  console.log(body);
  console.log("conversationId:", body.conversationId);
  console.log("type:", body.type);
  console.log("content:", body.content);
  console.log("attachment:", body.attachment);
  console.log("fileName:", body.fileName);
  console.log("fileSize:", body.fileSize);
  console.log("==========================================");

  return this.service.sendMessage(
    req.user.sub,
    body,
  );
}
  @Patch("messages/:id")
 @Roles(...VIEW_ROLES)
  updateMessage(
    @Req() req: any,

    @Param("id")
    id: string,

    @Body()
    dto: UpdateMessageDto,
  ) {
    return this.service.updateMessage(
      req.user.sub,
      id,
      dto,
    );
  }

  @Delete("messages/:id")
 @Roles(...VIEW_ROLES)
  deleteMessage(
    @Req() req: any,

    @Param("id")
    id: string,
  ) {
    return this.service.deleteMessage(
      req.user.sub,
      id,
    );
  }

  // =====================================================
  // Upload
  // =====================================================

  @Post("upload")
 @Roles(...VIEW_ROLES)
  @UseInterceptors(
    FileInterceptor("file"),
  )
  upload(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.service.uploadFile(
      file,
    );
  }

  // =====================================================
  // Read Status
  // =====================================================

  @Patch("conversations/:id/read")
 @Roles(...VIEW_ROLES)
  markAsRead(
    @Req() req: any,

    @Param("id")
    id: string,
  ) {
    return this.service.markAsRead(
      id,
      req.user.sub,
    );
  }

  @Get("unread-count")
  @Roles(...VIEW_ROLES)
  unreadCount(
    @Req() req: any,
  ) {
    return this.service.unreadCount(
      req.user.sub,
    );
  }
}