import type {
  Conversation,
  Message,
} from "../types/chat";

export function mapConversation(
  conversation: any,
): Conversation {
  const participant =
    conversation.participant ??
    conversation.otherParticipant ??
    conversation.user ??
    {};

  return {
    id:
      conversation.id ??
      conversation._id ??
      "",

    participant: {
      /**
       * Employee Id
       */
      id:
        participant.id ??
        participant._id ??
        "",

      /**
       * Employee Code
       */
      employeeId:
        participant.employeeId ??
        "",

      /**
       * Auth User Id
       */
      userId:
        participant.userId ??
        participant.user?.id ??
        participant.user?._id ??
        "",

      firstName:
        participant.firstName ??
        "",

      lastName:
        participant.lastName ??
        "",

      fullName:
        participant.fullName ??
        participant.name ??
        "",

      avatar:
        participant.avatar ??
        "",

      designation:
        participant.designation ??
        "",

      department:
        participant.department ??
        "",

      status:
        participant.status ??
        "",

      online:
        participant.online ??
        false,
    },

    lastMessage:
      conversation.lastMessage ??
      "",

    lastMessageAt:
      conversation.lastMessageAt ??
      undefined,

    unread:
      conversation.unread ??
      conversation.unreadCount ??
      0,

    type:
      conversation.type ??
      "DIRECT",

    createdAt:
      conversation.createdAt ??
      "",

    updatedAt:
      conversation.updatedAt ??
      "",
  };
}

export function mapConversationList(
  response: any,
): Conversation[] {
  const data =
    response.data ??
    response;

  const items =
    data.items ??
    data;

  return items.map(
    mapConversation,
  );
}

export function mapMessage(
  message: any,
): Message {
  return {
    id:
      message.id ??
      message._id,

    conversationId:
      message.conversation ??
      message.conversationId,

    sender: {
      /**
       * Employee Id
       */
      id:
        message.sender?.id ??
        message.sender?._id ??
        "",

      /**
       * Auth User Id
       */
      userId:
        message.sender?.userId ??
        message.sender?.user?.id ??
        message.sender?.user?._id ??
        "",

      firstName:
        message.sender?.firstName ??
        "",

      lastName:
        message.sender?.lastName ??
        "",

      fullName:
        message.sender?.fullName ??
        "",

      avatar:
        message.sender?.avatar ??
        "",
    },

    type:
      (
        message.type ??
        ""
      ).toLowerCase(),

    content:
      message.content ??
      "",

    attachment:
      message.attachment ??
      "",

    fileName:
      message.fileName ??
      "",

    fileSize:
      message.fileSize ??
      0,

    /**
     * Call log fields — only meaningful when type is
     * "audio_call" or "video_call".
     */
    callStatus:
      message.callStatus ??
      undefined,

    callDuration:
      message.callDuration ??
      0,

    createdAt:
      message.createdAt,

    updatedAt:
      message.updatedAt,

    edited:
      message.edited ??
      false,

    deleted:
      message.deleted ??
      false,

    read:
      message.read ??
      false,

    isMine:
      message.isMine ??
      false,
  };
}

export function mapMessageList(
  response: any,
): Message[] {
  const data =
    response.data ??
    response;

  const items =
    data.items ??
    data;

  return items.map(
    mapMessage,
  );
}