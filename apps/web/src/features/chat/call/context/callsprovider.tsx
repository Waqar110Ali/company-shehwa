// newprovider/
import {
    type ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { getSocket } from "../../socket/socket";

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

export function CallProvider({
    children,
    employeeId,
}: Props) {
    console.log("================================");
    console.log("CallProvider Render");
    console.log("employeeId:", employeeId);
    console.log("socket:", getSocket());
    console.log("================================");

    // =====================================================
    // State
    // =====================================================

    const [status, setStatus] =
        useState<CallStatus>("idle");

    const [callType, setCallType] =
        useState<CallType>();

    const [
        incomingCall,
        setIncomingCall,
    ] =
        useState<IncomingCallPayload | null>(
            null,
        );

    const [
        localStream,
        setLocalStream,
    ] =
        useState<MediaStream>();

    const [
        remoteStream,
        setRemoteStream,
    ] =
        useState<MediaStream>();

    // =====================================================
    // Refs
    // =====================================================

    const peerConnectionRef =
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

    const screenTrackRef =
        useRef<MediaStreamTrack | null>(
            null,
        );

    const pendingCandidatesRef =
        useRef<
            RTCIceCandidateInit[]
        >([]);

    const isCallerRef =
        useRef(false);

    /**
     * These are used by every async callback.
     * Using refs avoids stale closures.
     */
    const conversationIdRef =
        useRef<string>();

    const receiverIdRef =
        useRef<string>();

    const callTypeRef =
        useRef<CallType>();

    // =====================================================
    // Socket Helper
    // =====================================================

    const getCurrentSocket =
        useCallback(() => {
            return getSocket();
        }, []);

    // =====================================================
    // Stream Helpers
    // =====================================================

    const stopStream =
        useCallback(
            (
                stream?: MediaStream | null,
            ) => {
                if (!stream) {
                    return;
                }

                stream
                    .getTracks()
                    .forEach((track) =>
                        track.stop(),
                    );
            },
            [],
        );

    const getMedia =
        useCallback(
            async (
                type: CallType,
            ) => {
                const stream =
                    await navigator.mediaDevices.getUserMedia(
                        {
                            audio: true,

                            video:
                                type ===
                                "video",
                        },
                    );

                localStreamRef.current =
                    stream;

                setLocalStream(
                    stream,
                );

                return stream;
            },
            [],
        );

    // =====================================================
    // Reset
    // =====================================================

    const resetCall =
        useCallback(() => {
            stopStream(
                localStreamRef.current,
            );

            stopStream(
                remoteStreamRef.current,
            );

            peerConnectionRef.current?.close();

            peerConnectionRef.current =
                null;

            localStreamRef.current =
                null;

            remoteStreamRef.current =
                null;

            screenTrackRef.current =
                null;

            pendingCandidatesRef.current =
                [];

            isCallerRef.current =
                false;

            conversationIdRef.current =
                undefined;

            receiverIdRef.current =
                undefined;

            callTypeRef.current =
                undefined;

            setIncomingCall(
                null,
            );

            setLocalStream(
                undefined,
            );

            setRemoteStream(
                undefined,
            );

            setCallType(
                undefined,
            );

            setStatus(
                "idle",
            );
        }, [stopStream]);

    // =====================================================
    // Peer Connection
    // =====================================================

    const createPeerConnection =
        useCallback(() => {
            if (
                peerConnectionRef.current
            ) {
                return peerConnectionRef.current;
            }

            const pc =
                new RTCPeerConnection({
                    iceServers: [
                        {
                            urls: [
                                "stun:stun.l.google.com:19302",
                                "stun:stun1.l.google.com:19302",
                            ],
                        },
                    ],
                });

            peerConnectionRef.current =
                pc;

            const remote =
                new MediaStream();

            remoteStreamRef.current =
                remote;

            setRemoteStream(
                remote,
            );

            pc.ontrack = (
                event,
            ) => {
                event.streams[0]
                    .getTracks()
                    .forEach((track) => {
                        remote.addTrack(
                            track,
                        );
                    });
            };

            pc.onicecandidate = (
                event,
            ) => {
                if (
                    !event.candidate
                ) {
                    return;
                }

                const socket =
                    getCurrentSocket();

                if (
                    !socket ||
                    !conversationIdRef.current ||
                    !receiverIdRef.current
                ) {
                    return;
                }

                console.log("=========== ICE EMIT ===========");
                console.log(event.candidate);
                console.log({
                    conversationId: conversationIdRef.current,
                    senderId: employeeId,
                    receiverId: receiverIdRef.current,
                    signal: event.candidate?.toJSON(),
                });
                console.log("================================");

                socket.emit(
                    "webrtc:candidate",
                    {
                        conversationId: conversationIdRef.current,
                        senderId: employeeId,
                        receiverId: receiverIdRef.current,
                        signal: event.candidate.toJSON(),
                    },
                );
            };

            pc.onconnectionstatechange =
                () => {
                    switch (
                    pc.connectionState
                    ) {
                        case "connecting":
                            setStatus(
                                "connecting",
                            );
                            break;

                        case "connected":
                            setStatus(
                                "connected",
                            );
                            break;

                        case "failed":
                        case "closed":
                        case "disconnected":
                            resetCall();
                            break;
                    }
                };

            return pc;
        }, [
            employeeId,
            getCurrentSocket,
            resetCall,
        ]);
    // =====================================================
    // Local Tracks
    // =====================================================

    const addLocalTracks =
        useCallback(
            async (
                pc: RTCPeerConnection,
                type: CallType,
            ) => {
                const stream =
                    localStreamRef.current ??
                    (await getMedia(
                        type,
                    ));

                const existingTrackIds =
                    new Set(
                        pc
                            .getSenders()
                            .map(
                                (sender) =>
                                    sender.track?.id,
                            ),
                    );

                stream
                    .getTracks()
                    .forEach((track) => {
                        if (
                            existingTrackIds.has(
                                track.id,
                            )
                        ) {
                            return;
                        }

                        pc.addTrack(
                            track,
                            stream,
                        );
                    });

                return stream;
            },
            [getMedia],
        );

    // =====================================================
    // Offer
    // =====================================================

    const createOffer =
        useCallback(
            async () => {
                const socket =
                    getCurrentSocket();

                if (
                    !socket ||
                    !conversationIdRef.current ||
                    !receiverIdRef.current
                ) {
                    return;
                }

                const pc =
                    createPeerConnection();

                await addLocalTracks(
                    pc,
                    callTypeRef.current ??
                    "audio",
                );

                const offer =
                    await pc.createOffer();

                await pc.setLocalDescription(
                    offer,
                );

                console.log("=========== OFFER EMIT ===========");
                console.log(offer);
                console.log({
                    conversationId: conversationIdRef.current,
                    senderId: employeeId,
                    receiverId: receiverIdRef.current,
                    signal: offer,
                });
                console.log("==================================");

                socket.emit("webrtc:offer", {
                    conversationId: conversationIdRef.current,
                    senderId: employeeId,
                    receiverId: receiverIdRef.current,
                    signal: offer,
                });
            },
            [
                employeeId,
                addLocalTracks,
                createPeerConnection,
                getCurrentSocket,
            ],
        );

    // =====================================================
    // Answer
    // =====================================================

    const createAnswer =
        useCallback(
            async (
                offer: RTCSessionDescriptionInit,
            ) => {
                const socket =
                    getCurrentSocket();

                if (
                    !socket ||
                    !conversationIdRef.current ||
                    !receiverIdRef.current
                ) {
                    return;
                }

                const pc =
                    createPeerConnection();

                await addLocalTracks(
                    pc,
                    callTypeRef.current ??
                    "audio",
                );

                await pc.setRemoteDescription(
                    new RTCSessionDescription(
                        offer,
                    ),
                );

                const answer =
                    await pc.createAnswer();

                await pc.setLocalDescription(
                    answer,
                );

                console.log("=========== ANSWER EMIT ===========");
                console.log(answer);
                console.log({
                    conversationId: conversationIdRef.current,
                    senderId: employeeId,
                    receiverId: receiverIdRef.current,
                    signal: answer,
                });
                console.log("==================================");


                socket.emit("webrtc:answer", {
                    conversationId: conversationIdRef.current,
                    senderId: employeeId,
                    receiverId: receiverIdRef.current,
                    signal: answer,
                });
                while (
                    pendingCandidatesRef
                        .current.length > 0
                ) {
                    const candidate =
                        pendingCandidatesRef.current.shift();

                    if (
                        !candidate
                    ) {
                        continue;
                    }

                    await pc.addIceCandidate(
                        new RTCIceCandidate(
                            candidate,
                        ),
                    );
                }
            },
            [
                employeeId,
                addLocalTracks,
                createPeerConnection,
                getCurrentSocket,
            ],
        );

    // =====================================================
    // Remote Answer
    // =====================================================

    const applyAnswer =
        useCallback(
            async (
                answer: RTCSessionDescriptionInit,
            ) => {
                const pc =
                    peerConnectionRef.current;

                if (
                    !pc
                ) {
                    return;
                }

                await pc.setRemoteDescription(
                    new RTCSessionDescription(
                        answer,
                    ),
                );

                while (
                    pendingCandidatesRef
                        .current.length > 0
                ) {
                    const candidate =
                        pendingCandidatesRef.current.shift();

                    if (
                        !candidate
                    ) {
                        continue;
                    }

                    await pc.addIceCandidate(
                        new RTCIceCandidate(
                            candidate,
                        ),
                    );
                }
            },
            [],
        );

    // =====================================================
    // ICE Candidate
    // =====================================================

    const applyCandidate =
        useCallback(
            async (
                candidate: RTCIceCandidateInit,
            ) => {
                const pc =
                    peerConnectionRef.current;

                if (
                    !pc
                ) {
                    pendingCandidatesRef.current.push(
                        candidate,
                    );

                    return;
                }

                if (
                    !pc.remoteDescription
                ) {
                    pendingCandidatesRef.current.push(
                        candidate,
                    );

                    return;
                }

                await pc.addIceCandidate(
                    new RTCIceCandidate(
                        candidate,
                    ),
                );
            },
            [],
        );

    // =====================================================
    // Cleanup
    // =====================================================

    useEffect(() => {
        return () => {
            resetCall();
        };
    }, [resetCall]);
    // =====================================================
    // Socket Events
    // =====================================================

    useEffect(() => {
        const socket =
            getCurrentSocket();

        if (!socket) {
            console.log(
                "Waiting for socket...",
            );

            return;
        }

        // -------------------------------------------------
        // Incoming Call
        // -------------------------------------------------

        const handleIncomingCall =
            (
                payload: IncomingCallPayload,
            ) => {
                console.log(
                    "[CALL] Incoming",
                    payload,
                );

                conversationIdRef.current =
                    payload.conversationId;

                receiverIdRef.current =
                    payload.callerId;

                callTypeRef.current =
                    payload.type;

                setIncomingCall(
                    payload,
                );

                setCallType(
                    payload.type,
                );

                setStatus(
                    "ringing",
                );

                socket.emit(
                    "conversation:join",
                    payload.conversationId,
                );
            };

        // -------------------------------------------------
        // Call Accepted
        // -------------------------------------------------

        const handleAccepted =
            async () => {
                console.log(
                    "[CALL] Accepted",
                );

                setStatus(
                    "connecting",
                );

                if (
                    !isCallerRef.current
                ) {
                    return;
                }

                await createOffer();
            };

        // -------------------------------------------------
        // WebRTC Offer
        // -------------------------------------------------

        const handleOffer =
            async (
                payload: {
                    conversationId: string;

                    senderId: string;

                    receiverId: string;

                    signal: RTCSessionDescriptionInit;
                },
            ) => {
                console.log(
                    "[WEBRTC] Offer",
                    payload,
                );

                conversationIdRef.current =
                    payload.conversationId;

                receiverIdRef.current =
                    payload.senderId;

                await createAnswer(
                    payload.signal,
                );
            };

        // -------------------------------------------------
        // WebRTC Answer
        // -------------------------------------------------

        const handleAnswer =
            async (
                payload: {
                    signal: RTCSessionDescriptionInit;
                },
            ) => {
                console.log(
                    "[WEBRTC] Answer",
                    payload,
                );

                await applyAnswer(
                    payload.signal,
                );
            };

        // -------------------------------------------------
        // ICE Candidate
        // -------------------------------------------------

        const handleCandidate =
            async (
                payload: {
                    signal: RTCIceCandidateInit;
                },
            ) => {
                await applyCandidate(
                    payload.signal,
                );
            };

        // -------------------------------------------------
        // Call Rejected
        // -------------------------------------------------

        const handleRejected =
            () => {
                console.log(
                    "[CALL] Rejected",
                );

                resetCall();
            };

        // -------------------------------------------------
        // Call Ended
        // -------------------------------------------------

        const handleEnded =
            () => {
                console.log(
                    "[CALL] Ended",
                );

                resetCall();
            };

        // =================================================
        // Register Events
        // =================================================

        socket.on(
            "call:incoming",
            handleIncomingCall,
        );

        socket.on(
            "call:accepted",
            handleAccepted,
        );

        socket.on(
            "webrtc:offer",
            handleOffer,
        );

        socket.on(
            "webrtc:answer",
            handleAnswer,
        );

        socket.on(
            "webrtc:candidate",
            handleCandidate,
        );

        socket.on(
            "call:rejected",
            handleRejected,
        );

        socket.on(
            "call:ended",
            handleEnded,
        );

        // =================================================
        // Cleanup
        // =================================================

        return () => {
            socket.off(
                "call:incoming",
                handleIncomingCall,
            );

            socket.off(
                "call:accepted",
                handleAccepted,
            );

            socket.off(
                "webrtc:offer",
                handleOffer,
            );

            socket.off(
                "webrtc:answer",
                handleAnswer,
            );

            socket.off(
                "webrtc:candidate",
                handleCandidate,
            );

            socket.off(
                "call:rejected",
                handleRejected,
            );

            socket.off(
                "call:ended",
                handleEnded,
            );
        };
    }, [
        getCurrentSocket,
        createOffer,
        createAnswer,
        applyAnswer,
        applyCandidate,
        resetCall,
    ]);

    // =====================================================
    // Call Actions
    // =====================================================
    const startAudioCall =
        useCallback(
            async (
                targetConversationId: string,
                targetEmployeeId: string,
            ) => {
                const socket =
                    getCurrentSocket();

                console.log("================================");
                console.log("CallProvider.startAudioCall()");
                console.log("socket =", socket);
                console.log("employeeId =", employeeId);
                console.log(
                    "conversationId =",
                    targetConversationId,
                );
                console.log(
                    "receiverId =",
                    targetEmployeeId,
                );

                if (!socket) {
                    console.error(
                        "Socket is NULL",
                    );

                    return;
                }

                try {
                    console.log(
                        "Requesting microphone...",
                    );

                    await getMedia(
                        "audio",
                    );

                    console.log(
                        "Microphone granted",
                    );

                    isCallerRef.current =
                        true;

                    conversationIdRef.current =
                        targetConversationId;

                    receiverIdRef.current =
                        targetEmployeeId;

                    callTypeRef.current =
                        "audio";

                    setCallType(
                        "audio",
                    );

                    setStatus(
                        "calling",
                    );

                    socket.emit(
                        "conversation:join",
                        targetConversationId,
                    );

                    console.log(
                        "Emitting call:start",
                    );

                    socket.emit(
                        "call:start",
                        {
                            conversationId:
                                targetConversationId,

                            callerId:
                                employeeId,

                            receiverId:
                                targetEmployeeId,

                            type:
                                "audio",
                        },
                    );

                    console.log(
                        "call:start emitted",
                    );
                } catch (
                error
                ) {
                    console.error(
                        "startAudioCall ERROR",
                        error,
                    );

                    resetCall();
                }

                console.log(
                    "================================",
                );
            },
            [
                employeeId,
                getCurrentSocket,
                getMedia,
                resetCall,
            ],
        );

    const startVideoCall =
        useCallback(
            async (
                targetConversationId: string,
                targetEmployeeId: string,
            ) => {
                const socket =
                    getCurrentSocket();

                if (!socket) {
                    return;
                }

                try {
                    await getMedia(
                        "video",
                    );

                    isCallerRef.current =
                        true;

                    conversationIdRef.current =
                        targetConversationId;

                    receiverIdRef.current =
                        targetEmployeeId;

                    callTypeRef.current =
                        "video";

                    setCallType(
                        "video",
                    );

                    setStatus(
                        "calling",
                    );

                    socket.emit(
                        "conversation:join",
                        targetConversationId,
                    );

                    socket.emit(
                        "call:start",
                        {
                            conversationId:
                                targetConversationId,

                            callerId:
                                employeeId,

                            receiverId:
                                targetEmployeeId,

                            type:
                                "video",
                        },
                    );
                } catch (
                error
                ) {
                    console.error(
                        "startVideoCall ERROR",
                        error,
                    );

                    resetCall();
                }
            },
            [
                employeeId,
                getCurrentSocket,
                getMedia,
                resetCall,
            ],
        );

    const acceptCall =
        useCallback(
            async () => {
                const socket =
                    getCurrentSocket();

                if (
                    !socket ||
                    !incomingCall
                ) {
                    return;
                }

                isCallerRef.current =
                    false;

                conversationIdRef.current =
                    incomingCall.conversationId;

                receiverIdRef.current =
                    incomingCall.callerId;

                callTypeRef.current =
                    incomingCall.type;

                setCallType(
                    incomingCall.type,
                );

                setStatus(
                    "connecting",
                );

                await getMedia(
                    incomingCall.type,
                );

                socket.emit(
                    "conversation:join",
                    incomingCall.conversationId,
                );

                socket.emit(
                    "call:accept",
                    incomingCall,
                );
            },
            [
                incomingCall,
                getCurrentSocket,
                getMedia,
            ],
        );

    const rejectCall =
        useCallback(
            () => {
                const socket =
                    getCurrentSocket();

                if (
                    !socket ||
                    !incomingCall
                ) {
                    return;
                }

                socket.emit(
                    "call:reject",
                    incomingCall,
                );

                resetCall();
            },
            [
                incomingCall,
                getCurrentSocket,
                resetCall,
            ],
        );

    const endCall =
        useCallback(
            () => {
                const socket =
                    getCurrentSocket();

                if (
                    !socket ||
                    !conversationIdRef.current ||
                    !receiverIdRef.current
                ) {
                    resetCall();

                    return;
                }

                socket.emit(
                    "call:end",
                    {
                        conversationId:
                            conversationIdRef.current,

                        callerId:
                            employeeId,

                        receiverId:
                            receiverIdRef.current,

                        type:
                            callTypeRef.current ??
                            "audio",
                    },
                );

                resetCall();
            },
            [
                employeeId,
                getCurrentSocket,
                resetCall,
            ],
        );
    const toggleScreenShare = useCallback(async () => {
        const pc = peerConnectionRef.current;

        if (!pc) {
            return;
        }

        const sender = pc
            .getSenders()
            .find(
                (sender) =>
                    sender.track?.kind === "video",
            );

        if (!sender) {
            return;
        }

        // Already sharing -> switch back
        if (screenTrackRef.current) {
            const cameraTrack =
                localStreamRef.current
                    ?.getVideoTracks()[0];

            if (cameraTrack) {
                await sender.replaceTrack(
                    cameraTrack,
                );
            }

            screenTrackRef.current.stop();
            screenTrackRef.current = null;

            return;
        }

        const screen =
            await navigator.mediaDevices.getDisplayMedia({
                video: true,
            });

        const track =
            screen.getVideoTracks()[0];

        screenTrackRef.current =
            track;

        await sender.replaceTrack(track);

        track.onended = async () => {
            const cameraTrack =
                localStreamRef.current
                    ?.getVideoTracks()[0];

            if (cameraTrack) {
                await sender.replaceTrack(
                    cameraTrack,
                );
            }

            screenTrackRef.current = null;
        };
    }, []);
    const toggleMute = useCallback(() => {
        const stream = localStreamRef.current;

        if (!stream) {
            return;
        }

        stream.getAudioTracks().forEach((track) => {
            track.enabled = !track.enabled;
        });
    }, []);

    const toggleCamera = useCallback(() => {
        const stream = localStreamRef.current;

        if (!stream) {
            return;
        }

        stream.getVideoTracks().forEach((track) => {
            track.enabled = !track.enabled;
        });
    }, []);

    // =====================================================
    // Context
    // =====================================================

    const value =
        useMemo<CallContextValue>(
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
        <CallContext.Provider
            value={value}
        >
            {children}
        </CallContext.Provider>
    );
}