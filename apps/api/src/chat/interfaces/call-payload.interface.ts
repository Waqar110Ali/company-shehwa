export interface CallStartPayload {
  conversationId: string;

  callerId: string;

  receiverId: string;

  type: "audio" | "video";
}

export interface CallResponsePayload {
  conversationId: string;

  callerId: string;

  receiverId: string;
}

export interface CallEndPayload {
  conversationId: string;

  callerId: string;

  receiverId: string;
}