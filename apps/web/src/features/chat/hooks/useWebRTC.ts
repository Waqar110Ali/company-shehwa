import { useRef } from "react";

import {
  sendOffer,
  sendAnswer,
  sendCandidate,
} from "../socket/socket";

interface StartCallParams {
  conversationId: string;
  receiverId: string;
  callerId: string;
}

export function useWebRTC() {
  const peerRef =
    useRef<RTCPeerConnection | null>(
      null,
    );

  const localStreamRef =
    useRef<MediaStream | null>(
      null,
    );

  const remoteStreamRef =
    useRef<MediaStream | null>(
      null,
    );

  // =====================================================
  // Create Peer
  // =====================================================

  function createPeer() {
    const peer =
      new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
            ],
          },
        ],
      });

    peer.onicecandidate =
      (event) => {
        if (!event.candidate) {
          return;
        }

        sendCandidate({
          candidate:
            event.candidate,
        });
      };

    peer.ontrack =
      (event) => {
        remoteStreamRef.current =
          event.streams[0];
      };

    peerRef.current =
      peer;

    return peer;
  }

  // =====================================================
  // Local Media
  // =====================================================

  async function getLocalMedia(
    video = true,
  ) {
    const stream =
      await navigator.mediaDevices.getUserMedia(
        {
          audio: true,
          video,
        },
      );

    localStreamRef.current =
      stream;

    if (peerRef.current) {
      stream
        .getTracks()
        .forEach((track) => {
          peerRef.current?.addTrack(
            track,
            stream,
          );
        });
    }

    return stream;
  }

  // =====================================================
  // Caller
  // =====================================================

  async function createOffer(
    params: StartCallParams,
  ) {
    const peer =
      createPeer();

    await getLocalMedia(
      true,
    );

    const offer =
      await peer.createOffer();

    await peer.setLocalDescription(
      offer,
    );

    sendOffer({
      conversationId:
        params.conversationId,

      senderId:
        params.callerId,

      receiverId:
        params.receiverId,

      signal: offer,
    });
  }

  // =====================================================
  // Receiver
  // =====================================================

  async function receiveOffer(
    payload: any,
  ) {
    const peer =
      createPeer();

    await getLocalMedia(
      true,
    );

    await peer.setRemoteDescription(
      new RTCSessionDescription(
        payload.signal,
      ),
    );

    const answer =
      await peer.createAnswer();

    await peer.setLocalDescription(
      answer,
    );

    sendAnswer({
      conversationId:
        payload.conversationId,

      senderId:
        payload.receiverId,

      receiverId:
        payload.senderId,

      signal: answer,
    });
  }

  // =====================================================
  // Receive Answer
  // =====================================================

  async function receiveAnswer(
    payload: any,
  ) {
    if (
      !peerRef.current
    ) {
      return;
    }

    await peerRef.current.setRemoteDescription(
      new RTCSessionDescription(
        payload.signal,
      ),
    );
  }

  // =====================================================
  // ICE
  // =====================================================

  async function receiveCandidate(
    payload: any,
  ) {
    if (
      !peerRef.current
    ) {
      return;
    }

    await peerRef.current.addIceCandidate(
      new RTCIceCandidate(
        payload.candidate,
      ),
    );
  }

  // =====================================================
  // End
  // =====================================================

  function closeCall() {
    peerRef.current?.close();

    peerRef.current =
      null;

    localStreamRef.current
      ?.getTracks()
      .forEach((t) =>
        t.stop(),
      );

    remoteStreamRef.current
      ?.getTracks()
      .forEach((t) =>
        t.stop(),
      );

    localStreamRef.current =
      null;

    remoteStreamRef.current =
      null;
  }

  return {
    createOffer,
    receiveOffer,
    receiveAnswer,
    receiveCandidate,
    closeCall,

    localStreamRef,
    remoteStreamRef,
  };
}