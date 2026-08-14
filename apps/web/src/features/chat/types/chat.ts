// ======================================================
// Chat Participant
// ======================================================

export interface ChatParticipant {
  /**
   * Employee document id
   */
  id: string;

  /**
   * User document id
   */
  userId: string;

  /**
   * Employee code
   */
  employeeId: string;

  firstName: string;

  lastName: string;

  fullName: string;

  email?: string;

  avatar?: string;

  designation?: string;

  department?: string;

  status?: string;

  online: boolean;
}

// ======================================================
// Conversation
// ======================================================

export interface Conversation {
  id: string;

  participant: ChatParticipant;

  lastMessage?: string;

  lastMessageAt?: string;

  unread: number;

  type: "DIRECT" | "GROUP";

  createdAt: string;

  updatedAt: string;
}

// ======================================================
// Message Sender
// ======================================================

export interface MessageSender {
  id: string;

  employeeId?: string;

  userId?: string;

  firstName: string;

  lastName: string;

  fullName: string;

  avatar?: string;
}

// ======================================================
// Message
// ======================================================

export interface Message {
  id: string;

  conversationId: string;

  sender: MessageSender;

  type: string;

  content: string;

  attachment?: string;

  fileName?: string;

  fileSize?: number;

  /**
   * Call log fields — only present when type is
   * "audio_call" / "video_call" (AUDIO_CALL / VIDEO_CALL
   * from the backend, lowercased by the mapper).
   */
  callStatus?: "COMPLETED" | "MISSED" | "DECLINED";

  callDuration?: number;

  createdAt: string;

  updatedAt?: string;

  edited: boolean;

  deleted: boolean;

  read: boolean;

  isMine: boolean;
}