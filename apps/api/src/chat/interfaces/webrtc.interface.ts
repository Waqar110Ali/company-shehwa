export interface WebRtcOfferPayload {
  conversationId: string;

  from: string;

  to: string;

  offer: RTCSessionDescriptionInit;
}

export interface WebRtcAnswerPayload {
  conversationId: string;

  from: string;

  to: string;

  answer: RTCSessionDescriptionInit;
}

export interface IceCandidatePayload {
  conversationId: string;

  from: string;

  to: string;

  candidate: RTCIceCandidateInit;
}