// ======================================================
// Call Types
// ======================================================

export type CallType =
  | "audio"
  | "video";

// ======================================================
// Call Status
// ======================================================

export type CallStatus =
  | "idle"
  | "calling"
  | "ringing"
  | "connecting"
  | "connected";

// ======================================================
// Call Payloads
// ======================================================

export interface StartCallPayload {
  conversationId: string;

  callerId: string;

  receiverId: string;

  type: CallType;
}

export interface IncomingCallPayload {
  conversationId: string;

  callerId: string;

  receiverId: string;

  type: CallType;
}

export interface AcceptCallPayload {
  conversationId: string;

  callerId: string;

  receiverId: string;
}

export interface RejectCallPayload {
  conversationId: string;

  callerId: string;

  receiverId: string;
}

export interface EndCallPayload {
  conversationId: string;

  callerId: string;

  receiverId: string;

  type: CallType;
}

// ======================================================
// WebRTC Payloads
// ======================================================

export interface OfferPayload {
  conversationId: string;

  senderId: string;

  receiverId: string;

  offer: RTCSessionDescriptionInit;
}

export interface AnswerPayload {
  conversationId: string;

  senderId: string;

  receiverId: string;

  answer: RTCSessionDescriptionInit;
}

export interface CandidatePayload {
  conversationId: string;

  senderId: string;

  receiverId: string;

  candidate: RTCIceCandidateInit;
}

// ======================================================
// Context
// ======================================================

export interface CallContextValue {
  status: CallStatus;

  callType?: CallType;

  localStream?: MediaStream;

  remoteStream?: MediaStream;

  incomingCall: IncomingCallPayload | null;

  startAudioCall(
    conversationId: string,
    receiverId: string,
  ): Promise<void>;

  startVideoCall(
    conversationId: string,
    receiverId: string,
  ): Promise<void>;

  acceptCall(): Promise<void>;

  rejectCall(): void;

  endCall(): void;

  toggleMute(): void;

  toggleCamera(): void;

  toggleScreenShare(): Promise<void>;
}