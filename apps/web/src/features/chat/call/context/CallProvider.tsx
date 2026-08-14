import {
    type ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import type { Socket } from "socket.io-client";

import { connectSocket } from "../../socket/socket";

import { CallContext } from "./CallContext";

import type {
    CallContextValue,
    CallStatus,
    CallType,
    IncomingCallPayload,
} from "./types";

interface Props {
    children: ReactNode;
    employeeId: string;
}

// Add a TURN server here for reliable connectivity across restrictive
// NATs/corporate firewalls. STUN-only frequently fails to establish a
// media path in real-world networks (symmetric NAT, some office wifi, etc).
const ICE_SERVERS: RTCIceServer[] = [
    {
        urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
        ],
    },
    // {
    //     urls: "turn:your-turn-server.example.com:3478",
    //     username: "...",
    //     credential: "...",
    // },
];

export function CallProvider({ children, employeeId }: Props) {
    // =====================================================
    // Socket
    //
    // CallProvider wraps the whole authenticated app, so it owns the
    // socket connection itself instead of depending on some other
    // component (e.g. the chat page) to have connected first. This is
    // what makes incoming calls work app-wide instead of only after
    // visiting the chat screen.
    // =====================================================

    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!employeeId) {
            setSocket(null);
            return;
        }

        const s = connectSocket(employeeId);

        if (s.connected) {
            setSocket(s);
        }

        const handleConnect = () => setSocket(s);

        s.on("connect", handleConnect);

        return () => {
            s.off("connect", handleConnect);
        };
    }, [employeeId]);

    // =====================================================
    // State
    // =====================================================

    const [status, setStatus] = useState<CallStatus>("idle");
    const [callType, setCallType] = useState<CallType>();
    const [incomingCall, setIncomingCall] =
        useState<IncomingCallPayload | null>(null);
    const [localStream, setLocalStream] = useState<MediaStream>();
    const [remoteStream, setRemoteStream] = useState<MediaStream>();

    // =====================================================
    // Refs
    // =====================================================

    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const remoteStreamRef = useRef<MediaStream | null>(null);
    const screenTrackRef = useRef<MediaStreamTrack | null>(null);
    const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
    const isCallerRef = useRef(false);

    /** Used by every async callback. Refs avoid stale closures. */
    const conversationIdRef = useRef<string>();
    const receiverIdRef = useRef<string>();
    const callTypeRef = useRef<CallType>();

    // =====================================================
    // Stream helpers
    // =====================================================

    const stopStream = useCallback((stream?: MediaStream | null) => {
        stream?.getTracks().forEach((track) => track.stop());
    }, []);

    const getMedia = useCallback(async (type: CallType) => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: type === "video",
        });

        localStreamRef.current = stream;
        setLocalStream(stream);

        return stream;
    }, []);

    // =====================================================
    // Reset
    // =====================================================

    const resetCall = useCallback(() => {
        stopStream(localStreamRef.current);
        stopStream(remoteStreamRef.current);

        peerConnectionRef.current?.close();

        peerConnectionRef.current = null;
        localStreamRef.current = null;
        remoteStreamRef.current = null;
        screenTrackRef.current = null;
        pendingCandidatesRef.current = [];
        isCallerRef.current = false;
        conversationIdRef.current = undefined;
        receiverIdRef.current = undefined;
        callTypeRef.current = undefined;

        setIncomingCall(null);
        setLocalStream(undefined);
        setRemoteStream(undefined);
        setCallType(undefined);
        setStatus("idle");
    }, [stopStream]);

    // =====================================================
    // Peer connection
    // =====================================================

    const createPeerConnection = useCallback(() => {
        if (peerConnectionRef.current) {
            return peerConnectionRef.current;
        }

        const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
        peerConnectionRef.current = pc;

        const remote = new MediaStream();
        remoteStreamRef.current = remote;
        setRemoteStream(remote);

        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                if (!remote.getTracks().some((t) => t.id === track.id)) {
                    remote.addTrack(track);
                }
            });

            // Re-assign a fresh MediaStream reference so consumers
            // (the <video>/<audio> elements) reliably re-attach and
            // resume playback when a new track (e.g. audio arriving
            // after video, or vice versa) shows up. Some browsers do
            // not reliably surface tracks added to an already-attached
            // MediaStream object without this.
            setRemoteStream(new MediaStream(remote.getTracks()));
        };

        pc.onicecandidate = (event) => {
            if (!event.candidate) {
                return;
            }

            if (
                !socket ||
                !conversationIdRef.current ||
                !receiverIdRef.current
            ) {
                return;
            }

            socket.emit("webrtc:candidate", {
                conversationId: conversationIdRef.current,
                senderId: employeeId,
                receiverId: receiverIdRef.current,
                signal: event.candidate.toJSON(),
            });
        };

        pc.onconnectionstatechange = () => {
            switch (pc.connectionState) {
                case "connecting":
                    setStatus("connecting");
                    break;

                case "connected":
                    setStatus("connected");
                    break;

                case "failed":
                case "closed":
                case "disconnected":
                    resetCall();
                    break;
            }
        };

        return pc;
    }, [employeeId, socket, resetCall]);

    // =====================================================
    // Local tracks
    // =====================================================

    const addLocalTracks = useCallback(
        async (pc: RTCPeerConnection, type: CallType) => {
            const stream = localStreamRef.current ?? (await getMedia(type));

            const existingTrackIds = new Set(
                pc.getSenders().map((sender) => sender.track?.id),
            );

            stream.getTracks().forEach((track) => {
                if (existingTrackIds.has(track.id)) {
                    return;
                }

                pc.addTrack(track, stream);
            });

            return stream;
        },
        [getMedia],
    );

    // =====================================================
    // Offer (caller side)
    // =====================================================

    const createOffer = useCallback(async () => {
        if (!socket || !conversationIdRef.current || !receiverIdRef.current) {
            return;
        }

        const pc = createPeerConnection();

        await addLocalTracks(pc, callTypeRef.current ?? "audio");

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        socket.emit("webrtc:offer", {
            conversationId: conversationIdRef.current,
            senderId: employeeId,
            receiverId: receiverIdRef.current,
            signal: offer,
        });
    }, [employeeId, socket, addLocalTracks, createPeerConnection]);

    // =====================================================
    // Answer (receiver side)
    // =====================================================

    const createAnswer = useCallback(
        async (offer: RTCSessionDescriptionInit) => {
            if (
                !socket ||
                !conversationIdRef.current ||
                !receiverIdRef.current
            ) {
                return;
            }

            const pc = createPeerConnection();

            await pc.setRemoteDescription(new RTCSessionDescription(offer));

            await addLocalTracks(pc, callTypeRef.current ?? "audio");

            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);

            socket.emit("webrtc:answer", {
                conversationId: conversationIdRef.current,
                senderId: employeeId,
                receiverId: receiverIdRef.current,
                signal: answer,
            });

            while (pendingCandidatesRef.current.length > 0) {
                const candidate = pendingCandidatesRef.current.shift();

                if (!candidate) {
                    continue;
                }

                await pc.addIceCandidate(new RTCIceCandidate(candidate));
            }
        },
        [employeeId, socket, addLocalTracks, createPeerConnection],
    );

    // =====================================================
    // Remote answer (caller side)
    // =====================================================

    const applyAnswer = useCallback(
        async (answer: RTCSessionDescriptionInit) => {
            const pc = peerConnectionRef.current;

            if (!pc) {
                return;
            }

            await pc.setRemoteDescription(new RTCSessionDescription(answer));

            while (pendingCandidatesRef.current.length > 0) {
                const candidate = pendingCandidatesRef.current.shift();

                if (!candidate) {
                    continue;
                }

                await pc.addIceCandidate(new RTCIceCandidate(candidate));
            }
        },
        [],
    );

    // =====================================================
    // ICE candidate
    // =====================================================

    const applyCandidate = useCallback(
        async (candidate: RTCIceCandidateInit) => {
            const pc = peerConnectionRef.current;

            if (!pc || !pc.remoteDescription) {
                pendingCandidatesRef.current.push(candidate);
                return;
            }

            await pc.addIceCandidate(new RTCIceCandidate(candidate));
        },
        [],
    );

    // =====================================================
    // Cleanup on unmount
    // =====================================================

    useEffect(() => {
        return () => {
            resetCall();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // =====================================================
    // Socket events
    //
    // This effect now depends on the `socket` *state*, so it correctly
    // re-runs and binds listeners the moment the connection is ready,
    // instead of running once at mount and potentially seeing `null`
    // forever.
    // =====================================================

    useEffect(() => {
        if (!socket) {
            return;
        }

        const handleIncomingCall = (payload: IncomingCallPayload) => {
            conversationIdRef.current = payload.conversationId;
            receiverIdRef.current = payload.callerId;
            callTypeRef.current = payload.type;

            setIncomingCall(payload);
            setCallType(payload.type);
            setStatus("ringing");

            socket.emit("conversation:join", payload.conversationId);
        };

        const handleAccepted = async () => {
            setStatus("connecting");

            if (!isCallerRef.current) {
                return;
            }

            await createOffer();
        };

        const handleOffer = async (payload: {
            conversationId: string;
            senderId: string;
            receiverId: string;
            signal: RTCSessionDescriptionInit;
        }) => {
            conversationIdRef.current = payload.conversationId;
            receiverIdRef.current = payload.senderId;

            await createAnswer(payload.signal);
        };

        const handleAnswer = async (payload: {
            signal: RTCSessionDescriptionInit;
        }) => {
            await applyAnswer(payload.signal);
        };

        const handleCandidate = async (payload: {
            signal: RTCIceCandidateInit;
        }) => {
            await applyCandidate(payload.signal);
        };

        const handleRejected = () => resetCall();
        const handleEnded = () => resetCall();

        socket.on("call:incoming", handleIncomingCall);
        socket.on("call:accepted", handleAccepted);
        socket.on("webrtc:offer", handleOffer);
        socket.on("webrtc:answer", handleAnswer);
        socket.on("webrtc:candidate", handleCandidate);
        socket.on("call:rejected", handleRejected);
        socket.on("call:ended", handleEnded);

        return () => {
            socket.off("call:incoming", handleIncomingCall);
            socket.off("call:accepted", handleAccepted);
            socket.off("webrtc:offer", handleOffer);
            socket.off("webrtc:answer", handleAnswer);
            socket.off("webrtc:candidate", handleCandidate);
            socket.off("call:rejected", handleRejected);
            socket.off("call:ended", handleEnded);
        };
    }, [
        socket,
        createOffer,
        createAnswer,
        applyAnswer,
        applyCandidate,
        resetCall,
    ]);

    // =====================================================
    // Call actions
    // =====================================================

    const startAudioCall = useCallback(
        async (targetConversationId: string, targetEmployeeId: string) => {
            if (!socket) {
                return;
            }

            try {
                await getMedia("audio");

                isCallerRef.current = true;
                conversationIdRef.current = targetConversationId;
                receiverIdRef.current = targetEmployeeId;
                callTypeRef.current = "audio";

                setCallType("audio");
                setStatus("calling");

                socket.emit("conversation:join", targetConversationId);

                socket.emit("call:start", {
                    conversationId: targetConversationId,
                    callerId: employeeId,
                    receiverId: targetEmployeeId,
                    type: "audio",
                });
            } catch (error) {
                console.error("startAudioCall failed:", error);
                resetCall();
            }
        },
        [employeeId, socket, getMedia, resetCall],
    );

    const startVideoCall = useCallback(
        async (targetConversationId: string, targetEmployeeId: string) => {
            if (!socket) {
                return;
            }

            try {
                await getMedia("video");

                isCallerRef.current = true;
                conversationIdRef.current = targetConversationId;
                receiverIdRef.current = targetEmployeeId;
                callTypeRef.current = "video";

                setCallType("video");
                setStatus("calling");

                socket.emit("conversation:join", targetConversationId);

                socket.emit("call:start", {
                    conversationId: targetConversationId,
                    callerId: employeeId,
                    receiverId: targetEmployeeId,
                    type: "video",
                });
            } catch (error) {
                console.error("startVideoCall failed:", error);
                resetCall();
            }
        },
        [employeeId, socket, getMedia, resetCall],
    );

    const acceptCall = useCallback(async () => {
        if (!socket || !incomingCall) {
            return;
        }

        isCallerRef.current = false;
        conversationIdRef.current = incomingCall.conversationId;
        receiverIdRef.current = incomingCall.callerId;
        callTypeRef.current = incomingCall.type;

        setCallType(incomingCall.type);
        setStatus("connecting");

        await getMedia(incomingCall.type);

        socket.emit("conversation:join", incomingCall.conversationId);
        socket.emit("call:accept", incomingCall);
    }, [incomingCall, socket, getMedia]);

    const rejectCall = useCallback(() => {
        if (!socket || !incomingCall) {
            return;
        }

        socket.emit("call:reject", incomingCall);
        resetCall();
    }, [incomingCall, socket, resetCall]);

    const endCall = useCallback(() => {
        if (!socket || !conversationIdRef.current || !receiverIdRef.current) {
            resetCall();
            return;
        }

        socket.emit("call:end", {
            conversationId: conversationIdRef.current,
            callerId: employeeId,
            receiverId: receiverIdRef.current,
            type: callTypeRef.current ?? "audio",
        });

        resetCall();
    }, [employeeId, socket, resetCall]);

    const toggleScreenShare = useCallback(async () => {
        const pc = peerConnectionRef.current;

        if (!pc) {
            return;
        }

        const sender = pc
            .getSenders()
            .find((s) => s.track?.kind === "video");

        if (!sender) {
            return;
        }

        // Already sharing -> switch back to camera
        if (screenTrackRef.current) {
            const cameraTrack = localStreamRef.current?.getVideoTracks()[0];

            if (cameraTrack) {
                await sender.replaceTrack(cameraTrack);
            }

            screenTrackRef.current.stop();
            screenTrackRef.current = null;

            return;
        }

        const screen = await navigator.mediaDevices.getDisplayMedia({
            video: true,
        });

        const track = screen.getVideoTracks()[0];
        screenTrackRef.current = track;

        await sender.replaceTrack(track);

        track.onended = async () => {
            const cameraTrack = localStreamRef.current?.getVideoTracks()[0];

            if (cameraTrack) {
                await sender.replaceTrack(cameraTrack);
            }

            screenTrackRef.current = null;
        };
    }, []);

    const toggleMute = useCallback(() => {
        localStreamRef.current
            ?.getAudioTracks()
            .forEach((track) => (track.enabled = !track.enabled));
    }, []);

    const toggleCamera = useCallback(() => {
        localStreamRef.current
            ?.getVideoTracks()
            .forEach((track) => (track.enabled = !track.enabled));
    }, []);

    // =====================================================
    // Context
    // =====================================================

    const value = useMemo<CallContextValue>(
        () => ({
            status,
            callType,
            localStream,
            remoteStream,
            incomingCall,
            startAudioCall,
            startVideoCall,
            acceptCall,
            rejectCall,
            endCall,
            toggleMute,
            toggleCamera,
            toggleScreenShare,
        }),
        [
            status,
            callType,
            localStream,
            remoteStream,
            incomingCall,
            startAudioCall,
            startVideoCall,
            acceptCall,
            rejectCall,
            endCall,
            toggleMute,
            toggleCamera,
            toggleScreenShare,
        ],
    );

    return (
        <CallContext.Provider value={value}>{children}</CallContext.Provider>
    );
}