import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";

import {
    Server,
    Socket,
} from "socket.io";

import { Types } from "mongoose";

import { ChatRepository } from "../repository/chat.repository";
import { ChatMapper } from "../mapper/chat.mapper";
import { MessageType, CallLogStatus } from "../enums/message-status.enum";


// =====================================================
// Types
// =====================================================

interface TypingPayload {
    conversationId: string;

    employeeId: string;

    fullName: string;
}


interface CallPayload {
    conversationId: string;

    callerId: string;

    receiverId: string;

    type:
    | "audio"
    | "video";
}

interface WebRTCSignalPayload {
    conversationId: string;

    senderId: string;

    receiverId: string;

    offer?: RTCSessionDescriptionInit;

    answer?: RTCSessionDescriptionInit;

    candidate?: RTCIceCandidateInit;
}

interface ActiveCall {
    conversationId: string;

    callerId: string;

    receiverId: string;

    type:
    | "audio"
    | "video";

    status:
    | "ringing"
    | "accepted";

    /**
     * When the call:start event was received. Used as the
     * fallback timestamp if the call is never accepted.
     */
    startedAt: Date;

    /**
     * When the call:accept event was received. Used to compute
     * call duration once the call ends.
     */
    acceptedAt?: Date;

    /**
     * Timer that auto-resolves the call as MISSED if nobody
     * accepts/rejects within RING_TIMEOUT_MS.
     */
    ringTimeout?: NodeJS.Timeout;
}


// =====================================================
// Gateway
// =====================================================

@WebSocketGateway({
    cors: {
        origin: "*",
    },
})
export class ChatGateway
    implements
    OnGatewayConnection,
    OnGatewayDisconnect {

    constructor(
        private readonly repository: ChatRepository,

        private readonly mapper: ChatMapper,
    ) {}

    @WebSocketServer()
    server!: Server;


    /**
     * Employee presence
     *
     * employeeId
     *      |
     *      |-- socketId
     *      |-- socketId
     *
     * Supports:
     *
     * - multiple browser tabs
     * - multiple devices
     * - reconnects
     */
    private readonly users =
        new Map<
            string,
            Set<string>
        >();



    /**
     * Active calls
     *
     * conversationId
     *          |
     *          Call session
     */
    private readonly activeCalls =
        new Map<
            string,
            ActiveCall
        >();

    /**
     * How long an outgoing call is allowed to ring before it is
     * automatically resolved as a missed call.
     */
    private readonly RING_TIMEOUT_MS = 45_000;



    // =====================================================
    // Connection
    // =====================================================

    handleConnection(
        client: Socket,
    ) {

        console.log("\n");
        console.log(
            "======================================================",
        );

        console.log(
            "🔌 SOCKET CONNECTED",
        );

        console.log(
            "======================================================",
        );


        console.log(
            "Socket ID:",
        );

        console.log(
            client.id,
        );


        console.log(
            "--------------------------------",
        );


        console.log(
            "Handshake Query:",
        );

        console.log(
            client.handshake.query,
        );


        console.log(
            "--------------------------------",
        );


        console.log(
            "Handshake Auth:",
        );

        console.log(
            client.handshake.auth,
        );


        console.log(
            "--------------------------------",
        );


        console.log(
            "Client Rooms:",
        );

        console.log(
            [
                ...client.rooms,
            ],
        );


        console.log(
            "--------------------------------",
        );


        console.log(
            "Connected Clients:",
        );

        console.log(
            this.server.engine.clientsCount,
        );


        console.log(
            "======================================================",
        );

        console.log("\n");
    }


 handleDisconnect(
        client: Socket,
    ) {


        console.log("\n");

        console.log(
            "======================================================",
        );

        console.log(
            "🔌 SOCKET DISCONNECTED",
        );

        console.log(
            "======================================================",
        );


        console.log(
            "Socket ID:",
        );

        console.log(
            client.id,
        );


        console.log(
            "--------------------------------",
        );


        let disconnectedEmployee:
            | string
            | null = null;



        console.log(
            "Users BEFORE cleanup",
        );


        console.table(
            [
                ...this.users.entries(),
            ].map(
                ([
                    employeeId,
                    sockets,
                ]) => ({
                    employeeId,

                    sockets:
                        [
                            ...sockets,
                        ],
                }),
            ),
        );



        for (
            const [
                employeeId,
                socketIds,
            ]
            of this.users
        ) {


            if (
                socketIds.has(
                    client.id,
                )
            ) {


                disconnectedEmployee =
                    employeeId;


                socketIds.delete(
                    client.id,
                );



                console.log(
                    "Removed socket:",
                );


                console.log(
                    client.id,
                );



                console.log(
                    "Employee:",
                );


                console.log(
                    employeeId,
                );



                /**
                 * Remove employee completely
                 * when no active sockets remain
                 */
                if (
                    socketIds.size === 0
                ) {

                    this.users.delete(
                        employeeId,
                    );


                    this.emitUserOffline(
                        employeeId,
                    );

                }


                break;

            }

        }



        console.log(
            "--------------------------------",
        );


        console.log(
            "Users AFTER cleanup",
        );


        console.table(
            [
                ...this.users.entries(),
            ].map(
                ([
                    employeeId,
                    sockets,
                ]) => ({
                    employeeId,
        sockets:
                        [
                            ...sockets,
                        ],
                }),
            ),
        );



        // =====================================================
        // Cleanup Active Calls
        // =====================================================

        if (
            disconnectedEmployee
        ) {


            console.log(
                "Checking Active Calls",
            );



            for (
                const [
                    conversationId,
                    call,
                ]
                of this.activeCalls
            ) {


                if (
                    call.callerId ===
                    disconnectedEmployee
                    ||
                    call.receiverId ===
                    disconnectedEmployee
                ) {


                    console.log(
                        "Ending call:",
                    );


                    console.log(
                        conversationId,
                    );


                    if (
                        call.ringTimeout
                    ) {
                        clearTimeout(
                            call.ringTimeout,
                        );
                    }


                    this.server
                        .to(
                            call.callerId,
                        )
                        .emit(
                            "call:ended",
                            {
                                conversationId,
                            },
                        );



                    this.server
                        .to(
                            call.receiverId,
                        )
                        .emit(
                            "call:ended",
                            {
                                conversationId,
                            },
                        );



                    this.activeCalls.delete(
                        conversationId,
                    );


                    const outcome =
                        call.status ===
                        "accepted"
                            ? CallLogStatus.COMPLETED
                            : CallLogStatus.MISSED;


                    void this.logCallOutcome(
                        call,
                        outcome,
                    );

                }

            }

        }



        console.log(
            "Remaining Users:",
        );


        console.log(
            [
                ...this.users.keys(),
            ],
        );


        console.log(
            "Active Calls:",
        );


        console.table(
            [
                ...this.activeCalls.entries(),
            ],
        );


        console.log(
            "======================================================",
        );

        console.log("\n");

    }
    private emitUserOffline(
        employeeId: string,
    ) {

        console.log(
            "🔴 USER OFFLINE:",
            employeeId,
        );

        this.server.emit(
            "user:offline",
            {
                employeeId,
            },
        );

    }
    // =====================================================
    // User Presence
    // =====================================================


    @SubscribeMessage(
        "user:join",
    )
    join(
        @ConnectedSocket()
        client: Socket,

        @MessageBody()
        employeeId: string,
    ) {


        console.log("\n");

        console.log(
            "======================================================",
        );

        console.log(
            "👤 USER JOIN",
        );

        console.log(
            "======================================================",
        );


        console.log(
            "Socket:",
        );

        console.log(
            client.id,
        );
  console.log(
            "Employee:",
        );

        console.log(
            employeeId,
        );



        console.log(
            "Users BEFORE",
        );


        console.table(
            [
                ...this.users.entries(),
            ].map(
                ([
                    id,
                    sockets,
                ]) => ({
                    employeeId: id,

                    sockets:
                        [
                            ...sockets,
                        ],
                }),
            ),
        );



        /**
         * Create socket collection
         * if employee is new
         */
        if (
            !this.users.has(
                employeeId,
            )
        ) {

            this.users.set(
                employeeId,
                new Set<string>(),
            );

        }



        const sockets =
            this.users.get(
                employeeId,
            )!;



        const wasOffline =
            sockets.size === 0;



        sockets.add(
            client.id,
        );



        /**
         * Personal employee room
         *
         * Used for:
         *
         * - incoming calls
         * - private notifications
         */
        client.join(
            employeeId,
        );



        console.log(
            "Users AFTER",
        );


        console.table(
            [
                ...this.users.entries(),
            ].map(
                ([
                    id,
                    sockets,
                ]) => ({
                    employeeId: id,

                    sockets:
                        [
                            ...sockets,
                        ],
                }),
            ),
        );



        console.log(
            "Client Rooms:",
        );


        console.log(
            [
                ...client.rooms,
            ],
        );



        /**
         * Broadcast only first connection
         */
        if (
            wasOffline
        ) {

            this.emitUserOnline(
                employeeId,
            );

        }
   console.log(
            "======================================================",
        );


        console.log("\n");



        return {
            success: true,
        };

    }
    private emitUserOnline(
        employeeId: string,
    ) {

        console.log(
            "🟢 USER ONLINE:",
            employeeId,
        );

        this.server.emit(
            "user:online",
            {
                employeeId,
            },
        );

    }



    // =====================================================
    // Conversation Rooms
    // =====================================================


    @SubscribeMessage(
        "conversation:join",
    )
    joinConversation(
        @ConnectedSocket()
        client: Socket,


        @MessageBody()
        conversationId: string,
    ) {


        console.log("\n");


        console.log(
            "======================================================",
        );


        console.log(
            "💬 CONVERSATION JOIN",
        );


        console.log(
            "======================================================",
        );


        console.log(
            "Socket:",
        );


        console.log(
            client.id,
        );


        console.log(
            "Conversation:",
        );


        console.log(
            conversationId,
        );



        console.log(
            "Rooms BEFORE",
        );


        console.log(
            [
                ...client.rooms,
            ],
        );



        client.join(
            conversationId,
        );



        console.log(
            "Rooms AFTER",
        );


        console.log(
            [
                ...client.rooms,
            ],
        );



        const room =
            this.server
                .sockets
                .adapter
                .rooms
                .get(
                    conversationId,
                );



        console.log(
            "Participants:",
        );


        console.log(
            room
                ?
                [
                    ...room,
                ]
                :
                [],
        );



        console.log(
            "======================================================",
        );


        console.log("\n");



        return {
            success: true,
        };

    }



    @SubscribeMessage(
        "conversation:leave",
    )
    leaveConversation(
        @ConnectedSocket()
        client: Socket,


        @MessageBody()
        conversationId: string,
    ) {


        console.log("\n");


        console.log(
            "======================================================",
        );


        console.log(
            "🚪 CONVERSATION LEAVE",
        );


        console.log(
            "======================================================",
        );



        console.log(
            "Socket:",
        );


        console.log(
            client.id,
        );

        console.log(
            "Conversation:",
        );


        console.log(
            conversationId,
        );



        console.log(
            "Rooms BEFORE",
        );


        console.log(
            [
                ...client.rooms,
            ],
        );



        client.leave(
            conversationId,
        );



        console.log(
            "Rooms AFTER",
        );


        console.log(
            [
                ...client.rooms,
            ],
        );



        const room =
            this.server
                .sockets
                .adapter
                .rooms
                .get(
                    conversationId,
                );



        console.log(
            "Remaining Participants:",
        );


        console.log(
            room
                ?
                [
                    ...room,
                ]
                :
                [],
        );



        console.log(
            "======================================================",
        );


        console.log("\n");



        return {
            success: true,
        };

    }
    // =====================================================
    // Call Events
    // =====================================================

    @SubscribeMessage(
        "call:start",
    )
    startCall(
        @MessageBody()
        payload: CallPayload,
    ) {

        console.log("\n");

        console.log(
            "======================================================",
        );

        console.log(
            "📞 CALL START",
        );

        console.log(
            "======================================================",
        );

        console.log(
            "Conversation:",
        );

        console.log(
            payload.conversationId,
        );

        console.log(
            "Caller:",
        );

        console.log(
            payload.callerId,
        );

        console.log(
            "Receiver:",
        );

        console.log(
            payload.receiverId,
        );

        console.log(
            "Type:",
        );

        console.log(
            payload.type,
        );

        if (
            this.activeCalls.has(
                payload.conversationId,
            )
        ) {

            console.log(
                "Call already exists.",
            );

            return;

        }

        const call: ActiveCall = {
            ...payload,

            status:
                "ringing",

            startedAt:
                new Date(),
        };

        call.ringTimeout =
            setTimeout(
                () => {
                    this.handleMissedCall(
                        payload.conversationId,
                    );
                },
                this.RING_TIMEOUT_MS,
            );

        this.activeCalls.set(
            payload.conversationId,
            call,
        );

        console.log(
            "Active Calls:",
        );

        console.table(
            [
                ...this.activeCalls.entries(),
            ],
        );

        this.server
            .to(
                payload.receiverId,
            )
            .emit(
                "call:incoming",
                payload,
            );

        console.log(
            "Incoming call emitted.",
        );

        console.log(
            "======================================================",
        );

        console.log("\n");

    }
    @SubscribeMessage(
        "call:accept",
    )
    acceptCall(
        @MessageBody()
        payload: CallPayload,
    ) {    console.log("\n");

        console.log(
            "======================================================",
        );

        console.log(
            "✅ CALL ACCEPT",
        );

        console.log(
            "======================================================",
        );

        console.log(
            "Conversation:",
        );

        console.log(
            payload.conversationId,
        );

        const call =
            this.activeCalls.get(
                payload.conversationId,
            );

        if (
            !call
        ) {

            console.log(
                "No active call found.",
            );

            return;

        }

        if (
            call.ringTimeout
        ) {

            clearTimeout(
                call.ringTimeout,
            );

            call.ringTimeout =
                undefined;

        }

        call.status =
            "accepted";

        call.acceptedAt =
            new Date();

        this.activeCalls.set(
            payload.conversationId,
            call,
        );

        console.log(
            "Active Calls:",
        );

        console.table(
            [
                ...this.activeCalls.entries(),
            ],
        );

        this.server
            .to(
                payload.callerId,
            )
            .emit(
                "call:accepted",
                payload,
            );

        this.server
            .to(
                payload.receiverId,
            )
            .emit(
                "call:accepted",
                payload,
            );

        console.log(
            "Call accepted event emitted.",
        );

        console.log(
            "======================================================",
        );

        console.log("\n");

    }
    @SubscribeMessage(
        "call:reject",
    )
    rejectCall(
        @MessageBody()
        payload: CallPayload,
    ) {

        console.log("\n");

        console.log(
            "======================================================",
        );

        console.log(
            "❌ CALL REJECT",
        );

        console.log(
            "======================================================",
        );

        console.log(
            "Conversation:",
        );

        console.log(
            payload.conversationId,
        );

        const call =
            this.activeCalls.get(
                payload.conversationId,
            );

        if (
            !call
        ) {

            console.log(
                "No active call found.",
            );

            return;

        }

        if (
            call.ringTimeout
        ) {

            clearTimeout(
                call.ringTimeout,
            );

        }

        this.activeCalls.delete(
            payload.conversationId,
        );

        console.log(
            "Active Calls:",
        );

        console.table(
            [
                ...this.activeCalls.entries(),
            ],
        );

        this.server
            .to(
                payload.callerId,
            )
            .emit(
                "call:rejected",
                payload,
            );

        this.server
            .to(
                payload.receiverId,
            )
            .emit(
                "call:rejected",
                payload,
            );

        console.log(
            "Call rejected event emitted.",
        );

        void this.logCallOutcome(
            call,
            CallLogStatus.DECLINED,
        );

        console.log(
            "======================================================",
        );

        console.log("\n");

    }
    @SubscribeMessage(
        "call:end",
    )
    endCall(
        @MessageBody()
        payload: CallPayload,
    ) {

        console.log("\n");

        console.log(
            "======================================================",
        );

        console.log(
            "📴 CALL END",
        );

        console.log(
            "======================================================",
        );

        console.log(
            "Conversation:",
        );

        console.log(
            payload.conversationId,
        );

        const call =
            this.activeCalls.get(
                payload.conversationId,
            );

        if (
            !call
        ) {

            console.log(
                "No active call found.",
            );

            return;

        }

        if (
            call.ringTimeout
        ) {

            clearTimeout(
                call.ringTimeout,
            );

        }

        this.activeCalls.delete(
            payload.conversationId,
        );

        console.log(
            "Active Calls:",
        );

        console.table(
            [
                ...this.activeCalls.entries(),
            ],
        );

        this.server
            .to(
                payload.callerId,
            )
            .emit(
                "call:ended",
                payload,
            );

        this.server
            .to(
                payload.receiverId,
            )
            .emit(
                "call:ended",
                payload,
            );

        console.log(
            "Call ended event emitted.",
        );

        const outcome =
            call.status ===
            "accepted"
                ? CallLogStatus.COMPLETED
                : CallLogStatus.MISSED;

        void this.logCallOutcome(
            call,
            outcome,
        );

        console.log(
            "======================================================",
        );

        console.log("\n");

    }
    // =====================================================
    // WebRTC Signalling
    // =====================================================

    @SubscribeMessage(
        "webrtc:offer",
    )
    offer(
        @ConnectedSocket()
        client: Socket,

        @MessageBody()
        payload: WebRTCSignalPayload,
    ) {

        console.log("\n");

        console.log(
            "======================================================",
        );

        console.log(
            "📡 WEBRTC OFFER",
        );

        console.log(
            "======================================================",
        );

        console.log(
            "Socket:",
        );

        console.log(
            client.id,
        );

        console.log(
            "Conversation:",
        );

        console.log(
            payload.conversationId,
        );

        console.log(
            "Sender:",
        );

        console.log(
            payload.senderId,
        );

        console.log(
            "Receiver:",
        );

        console.log(
            payload.receiverId,
        );

        console.log(
            "Signal:",
        );

        console.dir(
            payload.offer,
            {
                depth: null,
            },
        );

        const receiverSockets =
            this.users.get(
                payload.receiverId,
            );

        if (
            !receiverSockets ||
            receiverSockets.size === 0
        ) {

            console.log(
                "Receiver is offline.",
            );

            return;

        }

        for (
            const socketId
            of receiverSockets
        ) {

            this.server
                .to(
                    socketId,
                )
                .emit(
                    "webrtc:offer",
                    payload,
                );

        }

        console.log(
            "Offer delivered.",
        );

        console.log(
            "======================================================",
        );

        console.log("\n");

    }
    @SubscribeMessage(
        "webrtc:answer",
    )
    answer(
        @ConnectedSocket()
        client: Socket,

        @MessageBody()
        payload: WebRTCSignalPayload,
    ) 
    {

        console.log("\n");

        console.log(
            "======================================================",
        );

        console.log(
            "📡 WEBRTC ANSWER",
        );

        console.log(
            "======================================================",
        );

        console.log(
            "Socket:",
        );

        console.log(
            client.id,
        );

        console.log(
            "Conversation:",
        );

        console.log(
            payload.conversationId,
        );

        console.log(
            "Sender:",
        );

        console.log(
            payload.senderId,
        );

        console.log(
            "Receiver:",
        );

        console.log(
            payload.receiverId,
        );

        console.log(
            "Signal:",
        );

        console.dir(
            payload.offer,
            {
                depth: null,
            },
        );

        const receiverSockets =
            this.users.get(
                payload.receiverId,
            );

        if (
            !receiverSockets ||
            receiverSockets.size === 0
        ) {

            console.log(
                "Receiver is offline.",
            );

            return;

        }

        for (
            const socketId
            of receiverSockets
        ) {

            this.server
                .to(
                    socketId,
                )
                .emit(
                    "webrtc:answer",
                    payload,
                );

        }

        console.log(
            "Answer delivered.",
        );

        console.log(
            "======================================================",
        );

        console.log("\n");

    }

// =====================================================
// ICE Candidate
// =====================================================

@SubscribeMessage(
    "webrtc:candidate",
)
candidate(
    @ConnectedSocket()
    client: Socket,

    @MessageBody()
    payload: WebRTCSignalPayload,
) {

    console.log("\n");

    console.log(
        "======================================================",
    );
 console.log(
        "🧊 WEBRTC ICE CANDIDATE",
    );

    console.log(
        "======================================================",
    );

    console.log(
        "Socket:",
    );

    console.log(
        client.id,
    );

    console.log(
        "Conversation:",
    );

    console.log(
        payload.conversationId,
    );

    console.log(
        "Sender:",
    );

    console.log(
        payload.senderId,
    );

    console.log(
        "Receiver:",
    );

    console.log(
        payload.receiverId,
    );

    console.log(
        "Candidate:",
    );

    console.dir(
        payload.candidate,
        {
            depth: null,
        },
    );

    const receiverSockets =
        this.users.get(
            payload.receiverId,
        );

    if (
        !receiverSockets ||
        receiverSockets.size === 0
    ) {

        console.log(
            "Receiver is offline.",
        );

        return;

    }

    for (
        const socketId
        of receiverSockets
    ) {

        this.server
            .to(
                socketId,
            )
            .emit(
                "webrtc:candidate",
                payload,
            );

    }

    console.log(
        "ICE candidate delivered.",
    );

    console.log(
        "======================================================",
    );

    console.log("\n");

}

    // =====================================================
    // Call Logging
    // =====================================================

    /**
     * Persists a call as a message in the conversation once its
     * outcome is known (completed, missed, or declined), and
     * broadcasts it live via emitMessage so both participants'
     * chat threads update immediately.
     */
    private async logCallOutcome(
        call: ActiveCall,
        callStatus: CallLogStatus,
    ) {

        try {

            const duration =
                callStatus ===
                    CallLogStatus.COMPLETED &&
                call.acceptedAt
                    ? Math.max(
                          0,
                          Math.round(
                              (Date.now() -
                                  call.acceptedAt.getTime()) /
                                  1000,
                          ),
                      )
                    : 0;

            const type =
                call.type === "video"
                    ? MessageType.VIDEO_CALL
                    : MessageType.AUDIO_CALL;

            const created =
                await this.repository.createMessage({
                    conversation:
                        new Types.ObjectId(
                            call.conversationId,
                        ),

                    sender:
                        new Types.ObjectId(
                            call.callerId,
                        ),

                    type,

                    content: "",

                    callStatus,

                    callDuration:
                        duration,
                } as any);

            const populated =
                await this.repository.findMessageById(
                    created.id,
                );

            if (
                !populated
            ) {

                console.log(
                    "Call message not found after creation.",
                );

                return;

            }

            const lastMessage =
                callStatus ===
                CallLogStatus.MISSED
                    ? call.type ===
                      "video"
                        ? "🎥 Missed video call"
                        : "📞 Missed audio call"
                    : callStatus ===
                        CallLogStatus.DECLINED
                      ? "📞 Call declined"
                      : call.type ===
                          "video"
                        ? "🎥 Video call"
                        : "📞 Audio call";

            await this.repository.updateConversationLastMessage(
                call.conversationId,
                lastMessage,
            );

            const response =
                this.mapper.toMessage(
                    populated,
                    call.callerId,
                );

            this.emitMessage(
                call.conversationId,
                response,
            );

            console.log(
                "📝 Call logged:",
                callStatus,
                "duration:",
                duration,
            );

        } catch (
            error
        ) {

            console.error(
                "Failed to log call message:",
                error,
            );

        }

    }

    /**
     * Auto-resolves a call as MISSED if it is still ringing
     * after RING_TIMEOUT_MS with no accept/reject.
     */
    private handleMissedCall(
        conversationId: string,
    ) {

        const call =
            this.activeCalls.get(
                conversationId,
            );

        if (
            !call ||
            call.status !== "ringing"
        ) {

            return;

        }

        console.log(
            "⏰ Call timed out (missed):",
            conversationId,
        );

        this.activeCalls.delete(
            conversationId,
        );

        this.server
            .to(
                call.callerId,
            )
            .emit(
                "call:ended",
                {
                    conversationId,
                },
            );

        this.server
            .to(
                call.receiverId,
            )
            .emit(
                "call:ended",
                {
                    conversationId,
                },
            );

        void this.logCallOutcome(
            call,
            CallLogStatus.MISSED,
        );

    }

    public emitMessage(
        conversationId: string,
        message: unknown,
    ) {
        this.server
            .to(conversationId)
            .emit(
                "message:new",
                message,
            );
    }
    public emitUpdatedMessage(
        conversationId: string,
        message: unknown,
    ) {
        this.server
            .to(conversationId)
            .emit(
                "message:updated",
                message,
            );
    }
    public emitDeletedMessage(
        conversationId: string,
        payload: unknown,
    ) {
        this.server
            .to(conversationId)
            .emit(
                "message:deleted",
                payload,
            );
    }
    public emitConversationRead(
        conversationId: string,
        payload: unknown,
    ) {
        this.server
            .to(conversationId)
            .emit(
                "conversation:read",
                payload,
            );
    }
}