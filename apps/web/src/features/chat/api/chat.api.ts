import { api } from "@/lib/api";

import { MessageType } from "../types/message-type";

// ======================================================
// Conversations
// ======================================================

export interface ConversationQuery {
  search?: string;

  page?: number;

  limit?: number;
}

export interface CreateConversationDto {
  participantId: string;
}

// ======================================================
// Messages
// ======================================================

export interface SendMessageRequest {
  conversationId: string;

  content: string;

  type?: MessageType;

  attachment?: string;

  fileName?: string;

  fileSize?: number;
}

export interface UploadResponse {
  url: string;

  fileName: string;

  fileSize: number;

  type: "IMAGE" | "FILE";
}

export const chatApi = {
  // ======================================================
  // Conversations
  // ======================================================

  conversations(
    params?: ConversationQuery,
  ) {
    return api.get(
      "/chat/conversations",
      {
        params,
      },
    );
  },

  createConversation(
    dto: CreateConversationDto,
  ) {
    return api.post(
      "/chat/conversations",
      dto,
    );
  },

  markAsRead(
    conversationId: string,
  ) {
    return api.patch(
      `/chat/conversations/${conversationId}/read`,
    );
  },

  // ======================================================
  // Messages
  // ======================================================

  messages(
    conversationId: string,
  ) {
    return api.get(
      `/chat/conversations/${conversationId}/messages`,
    );
  },

  send(
    dto: SendMessageRequest,
  ) {
    return api.post(
      "/chat/messages",
      dto,
    );
  },

  upload(
    file: File,
  ) {
    const formData =
      new FormData();

    formData.append(
      "file",
      file,
    );

    return api.post<UploadResponse>(
      "/chat/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );
  },
};