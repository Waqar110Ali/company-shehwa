// import {
//     ConnectedSocket,
//     MessageBody,
//     OnGatewayConnection,
//     OnGatewayDisconnect,
//     SubscribeMessage,
//     WebSocketGateway,
//     WebSocketServer,
// } from "@nestjs/websockets";

// import {
//     Server,
//     Socket,
// } from "socket.io";

// interface TypingPayload {
//     conversationId: string;

//     employeeId: string;

//     fullName: string;
// }

// interface CallPayload {
//     conversationId: string;

//     callerId: string;

//     receiverId: string;

//     type: "audio" | "video";
// }

// @WebSocketGateway({
//     cors: {
//         origin: "*",
//     },
// })
// export class ChatGateway
//     implements
//     OnGatewayConnection,
//     OnGatewayDisconnect {
//     @WebSocketServer()
//     server!: Server;

//     /**
//      * employeeId -> socketId
//      */
//     private readonly users =
//         new Map<string, Set<string>>();

//     /**
//      * conversationId -> active call
//      */
//     private readonly activeCalls =
//         new Map<
//             string,
//             CallPayload
//         >();

//     // =====================================================
//     // Connection
//     // =====================================================

//     handleConnection(
//         client: Socket,
//     ) {
//         console.log("\n");
//         console.log("======================================================");
//         console.log("🔌 SOCKET CONNECTED");
//         console.log("======================================================");

//         console.log("Socket ID:");
//         console.log(client.id);

//         console.log("--------------------------------");

//         console.log("Handshake Query:");
//         console.log(client.handshake.query);

//         console.log("--------------------------------");

//         console.log("Handshake Auth:");
//         console.log(client.handshake.auth);

//         console.log("--------------------------------");

//         console.log("Current Rooms:");
//         console.log(
//             [...client.rooms],
//         );

//         console.log("--------------------------------");

//         console.log("Connected Clients:");
//         console.log(
//             this.server.engine.clientsCount,
//         );

//         console.log("======================================================");
//         console.log("\n");
//     }

//     handleDisconnect(
//         client: Socket,
//     ) {
//         console.log("\n");
//         console.log("======================================================");
//         console.log("🔌 SOCKET DISCONNECTED");
//         console.log("======================================================");

//         console.log("Socket ID:");
//         console.log(client.id);

//         let disconnectedEmployee:
//             | string
//             | null = null;

//         console.log("--------------------------------");

//         console.log(
//             "Users BEFORE removal",
//         );

//         console.table(
//             [...this.users.entries()],
//         );

//         for (const [
//             employeeId,
//             socketId,
//         ] of this.users) {
//             if (
//                 socketId ===
//                 client.id
//             ) {
//                 disconnectedEmployee =
//                     employeeId;

//                 console.log(
//                     "Removing Employee:",
//                 );
//                 console.log(
//                     employeeId,
//                 );

//                 this.users.delete(
//                     employeeId,
//                 );

//                 this.server.emit(
//                     "user:offline",
//                     employeeId,
//                 );

//                 break;
//             }
//         }

//         console.log("--------------------------------");

//         console.log(
//             "Users AFTER removal",
//         );

//         console.table(
//             [...this.users.entries()],
//         );

//         if (
//             disconnectedEmployee
//         ) {
//             console.log("--------------------------------");

//             console.log(
//                 "Checking Active Calls...",
//             );

//             for (const [
//                 conversationId,
//                 call,
//             ] of this.activeCalls) {
//                 console.log(
//                     "Conversation:",
//                     conversationId,
//                 );

//                 console.log(call);

//                 if (
//                     call.callerId ===
//                     disconnectedEmployee ||
//                     call.receiverId ===
//                     disconnectedEmployee
//                 ) {
//                     console.log(
//                         "Ending Active Call",
//                     );

//                     this.server
//                         .to(
//                             conversationId,
//                         )
//                         .emit(
//                             "call:ended",
//                             {
//                                 conversationId,
//                             },
//                         );

//                     this.activeCalls.delete(
//                         conversationId,
//                     );

//                     console.log(
//                         "Call Removed:",
//                         conversationId,
//                     );
//                 }
//             }
//         }

//         console.log("--------------------------------");

//         console.log(
//             "Remaining Online Employees",
//         );

//         console.log(
//             [...this.users.keys()],
//         );

//         console.log("--------------------------------");

//         console.log(
//             "Active Calls",
//         );

//         console.table(
//             [...this.activeCalls.entries()],
//         );

//         console.log("--------------------------------");

//         console.log(
//             "Connected Clients:",
//         );

//         console.log(
//             this.server.engine.clientsCount,
//         );

//         console.log("======================================================");
//         console.log("\n");
//     }

//     // =====================================================
//     // User Presence
//     // =====================================================
//     // =====================================================
//     // User Presence
//     // =====================================================

//     @SubscribeMessage("user:join")
//     join(
//         @ConnectedSocket()
//         client: Socket,

//         @MessageBody()
//         employeeId: string,
//     ) {
//         console.log("\n");
//         console.log("======================================================");
//         console.log("👤 USER JOIN EVENT");
//         console.log("======================================================");

//         console.log("Socket ID:");
//         console.log(client.id);

//         console.log("--------------------------------");

//         console.log("Employee ID Received:");
//         console.log(employeeId);

//         console.log("--------------------------------");

//         console.log("Employee ID Type:");
//         console.log(typeof employeeId);

//         console.log("--------------------------------");

//         console.log("Users BEFORE Insert");

//         console.table(
//             [...this.users.entries()],
//         );

//         this.users.set(
//             employeeId,
//             client.id,
//         );

//         console.log("--------------------------------");

//         console.log("Users AFTER Insert");

//         console.table(
//             [...this.users.entries()],
//         );

//         console.log("--------------------------------");

//         console.log("Joining Personal Room:");

//         console.log(employeeId);

//         client.join(
//             employeeId,
//         );

//         console.log("--------------------------------");

//         console.log("Client Rooms AFTER Join");

//         console.log(
//             [...client.rooms],
//         );

//         console.log("--------------------------------");

//         console.log("Server Room Exists:");

//         const room =
//             this.server.sockets.adapter.rooms.get(
//                 employeeId,
//             );

//         console.log(room);

//         console.log("--------------------------------");

//         console.log("Online Employees");

//         console.log(
//             [...this.users.keys()],
//         );

//         console.log("--------------------------------");

//         console.log("Connected Clients");

//         console.log(
//             this.server.engine.clientsCount,
//         );

//         console.log("--------------------------------");

//         console.log("Broadcasting user:online");

//         this.server.emit(
//             "user:online",
//             employeeId,
//         );

//         console.log("user:online emitted");

//         console.log("======================================================");
//         console.log("\n");

//         return {
//             success: true,
//         };
//     }
//     // =====================================================
//     // Conversation Rooms
//     // =====================================================

//     @SubscribeMessage(
//         "conversation:join",
//     )
//     joinConversation(
//         @ConnectedSocket()
//         client: Socket,

//         @MessageBody()
//         conversationId: string,
//     ) {
//         console.log("\n");
//         console.log("======================================================");
//         console.log("💬 CONVERSATION JOIN");
//         console.log("======================================================");

//         console.log("Socket ID:");
//         console.log(client.id);

//         console.log("--------------------------------");

//         console.log("Conversation ID:");
//         console.log(conversationId);

//         console.log("--------------------------------");

//         console.log("Rooms BEFORE Join");

//         console.log(
//             [...client.rooms],
//         );

//         client.join(
//             conversationId,
//         );

//         console.log("--------------------------------");

//         console.log("Rooms AFTER Join");

//         console.log(
//             [...client.rooms],
//         );

//         console.log("--------------------------------");

//         console.log("Conversation Room");

//         const room =
//             this.server.sockets.adapter.rooms.get(
//                 conversationId,
//             );

//         console.log(room);

//         console.log("--------------------------------");

//         console.log(
//             "Clients Inside Conversation",
//         );

//         console.log(
//             room
//                 ? [...room]
//                 : [],
//         );

//         console.log("--------------------------------");

//         console.log(
//             "Total Participants:",
//         );

//         console.log(
//             room?.size ?? 0,
//         );

//         console.log("======================================================");
//         console.log("\n");

//         return {
//             success: true,
//         };
//     }

//     @SubscribeMessage(
//         "conversation:leave",
//     )
//     leaveConversation(
//         @ConnectedSocket()
//         client: Socket,

//         @MessageBody()
//         conversationId: string,
//     ) {
//         console.log("\n");
//         console.log("======================================================");
//         console.log("🚪 CONVERSATION LEAVE");
//         console.log("======================================================");

//         console.log("Socket ID:");
//         console.log(client.id);

//         console.log("--------------------------------");

//         console.log("Conversation ID:");

//         console.log(
//             conversationId,
//         );

//         console.log("--------------------------------");

//         console.log("Rooms BEFORE Leave");

//         console.log(
//             [...client.rooms],
//         );

//         client.leave(
//             conversationId,
//         );

//         console.log("--------------------------------");

//         console.log("Rooms AFTER Leave");

//         console.log(
//             [...client.rooms],
//         );

//         console.log("--------------------------------");

//         const room =
//             this.server.sockets.adapter.rooms.get(
//                 conversationId,
//             );

//         console.log(
//             "Conversation Room AFTER Leave",
//         );

//         console.log(room);

//         console.log("--------------------------------");

//         console.log(
//             "Remaining Participants",
//         );

//         console.log(
//             room
//                 ? [...room]
//                 : [],
//         );

//         console.log("--------------------------------");

//         console.log(
//             "Participants Count",
//         );

//         console.log(
//             room?.size ?? 0,
//         );

//         console.log("======================================================");
//         console.log("\n");

//         return {
//             success: true,
//         };
//     }
//     // =====================================================
//     // Call Events
//     // =====================================================

//     @SubscribeMessage("call:start")
//     startCall(
//         @MessageBody()
//         payload: CallPayload,
//     ) {
//         console.log("\n");
//         console.log("======================================================");
//         console.log("📞 CALL START");
//         console.log("======================================================");

//         console.log("Conversation ID:");
//         console.log(payload.conversationId);

//         console.log("--------------------------------");

//         console.log("Caller ID:");
//         console.log(payload.callerId);

//         console.log("--------------------------------");

//         console.log("Receiver ID:");
//         console.log(payload.receiverId);

//         console.log("--------------------------------");

//         console.log("Call Type:");
//         console.log(payload.type);

//         console.log("--------------------------------");

//         console.log("Current Users Map");

//         console.table(
//             [...this.users.entries()],
//         );

//         console.log("--------------------------------");

//         console.log("Online Employees");

//         console.log(
//             [...this.users.keys()],
//         );

//         console.log("--------------------------------");

//         console.log("Receiver Exists:");

//         console.log(
//             this.users.has(
//                 payload.receiverId,
//             ),
//         );

//         console.log("--------------------------------");

//         const socketId =
//             this.users.get(
//                 payload.receiverId,
//             );

//         console.log("Receiver Socket:");

//         console.log(socketId);

//         console.log("--------------------------------");

//         console.log("Current Active Calls");

//         console.table(
//             [...this.activeCalls.entries()],
//         );

//         this.activeCalls.set(
//             payload.conversationId,
//             payload,
//         );

//         console.log("--------------------------------");

//         console.log("Active Calls AFTER Insert");

//         console.table(
//             [...this.activeCalls.entries()],
//         );

//         console.log("--------------------------------");

//         if (!socketId) {
//             console.log("❌ RECEIVER IS OFFLINE");
//         } else {
//             console.log("✅ RECEIVER IS ONLINE");
//             console.log("Sending call:incoming...");
//         }

//         this.emitToEmployee(
//             payload.receiverId,
//             "call:incoming",
//             payload,
//         );

//         console.log("--------------------------------");

//         console.log("call:incoming dispatched");

//         console.log("======================================================");
//         console.log("\n");
//     }

//     @SubscribeMessage(
//         "call:accept",
//     )
//     acceptCall(
//         @MessageBody()
//         payload: CallPayload,
//     ) {
//         console.log("\n");
//         console.log("======================================================");
//         console.log("✅ CALL ACCEPT");
//         console.log("======================================================");

//         console.log("Conversation:");
//         console.log(payload.conversationId);

//         console.log("--------------------------------");

//         console.log("Caller:");
//         console.log(payload.callerId);

//         console.log("--------------------------------");

//         console.log("Receiver:");
//         console.log(payload.receiverId);

//         console.log("--------------------------------");

//         console.log("Broadcasting call:accepted");

//         this.server
//             .to(
//                 payload.conversationId,
//             )
//             .emit(
//                 "call:accepted",
//                 payload,
//             );

//         console.log("call:accepted emitted");

//         console.log("======================================================");
//         console.log("\n");
//     }

//     @SubscribeMessage(
//         "call:reject",
//     )
//     rejectCall(
//         @MessageBody()
//         payload: CallPayload,
//     ) {
//         console.log("\n");
//         console.log("======================================================");
//         console.log("❌ CALL REJECT");
//         console.log("======================================================");

//         console.log("Conversation:");
//         console.log(payload.conversationId);

//         console.log("--------------------------------");

//         console.log("Active Calls BEFORE");

//         console.table(
//             [...this.activeCalls.entries()],
//         );

//         this.activeCalls.delete(
//             payload.conversationId,
//         );

//         console.log("--------------------------------");

//         console.log("Active Calls AFTER");

//         console.table(
//             [...this.activeCalls.entries()],
//         );

//         console.log("--------------------------------");

//         console.log("Broadcasting call:rejected");

//         this.server
//             .to(
//                 payload.conversationId,
//             )
//             .emit(
//                 "call:rejected",
//                 payload,
//             );

//         console.log("call:rejected emitted");

//         console.log("======================================================");
//         console.log("\n");
//     }

//     @SubscribeMessage(
//         "call:end",
//     )
//     endCall(
//         @MessageBody()
//         payload: CallPayload,
//     ) {
//         console.log("\n");
//         console.log("======================================================");
//         console.log("📴 CALL END");
//         console.log("======================================================");

//         console.log("Conversation:");
//         console.log(payload.conversationId);

//         console.log("--------------------------------");

//         console.log("Active Calls BEFORE");

//         console.table(
//             [...this.activeCalls.entries()],
//         );

//         this.activeCalls.delete(
//             payload.conversationId,
//         );

//         console.log("--------------------------------");

//         console.log("Active Calls AFTER");

//         console.table(
//             [...this.activeCalls.entries()],
//         );

//         console.log("--------------------------------");

//         console.log("Broadcasting call:ended");

//         this.server
//             .to(
//                 payload.conversationId,
//             )
//             .emit(
//                 "call:ended",
//                 payload,
//             );

//         console.log("call:ended emitted");

//         console.log("======================================================");
//         console.log("\n");
//     }
//     // =====================================================
//     // WebRTC Signalling
//     // =====================================================

//     @SubscribeMessage(
//         "webrtc:offer",
//     )
//     offer(
//         @ConnectedSocket()
//         client: Socket,

//         @MessageBody()
//         payload: any,
//     ) {
//         console.log("\n");
//         console.log("======================================================");
//         console.log("📡 WEBRTC OFFER");
//         console.log("======================================================");

//         console.log("Socket:");
//         console.log(client.id);

//         console.log("--------------------------------");

//         console.log("Conversation:");
//         console.log(payload.conversationId);

//         console.log("--------------------------------");

//         console.log("Payload:");
//         console.dir(payload, {
//             depth: null,
//         });

//         console.log("--------------------------------");

//         console.log("Broadcasting webrtc:offer");

//         client
//             .to(
//                 payload.conversationId,
//             )
//             .emit(
//                 "webrtc:offer",
//                 payload,
//             );

//         console.log("webrtc:offer emitted");

//         console.log("======================================================");
//         console.log("\n");
//     }

//     @SubscribeMessage(
//         "webrtc:answer",
//     )
//     answer(
//         @ConnectedSocket()
//         client: Socket,

//         @MessageBody()
//         payload: any,
//     ) {
//         console.log("\n");
//         console.log("======================================================");
//         console.log("📡 WEBRTC ANSWER");
//         console.log("======================================================");

//         console.log("Socket:");
//         console.log(client.id);

//         console.log("--------------------------------");

//         console.log("Conversation:");
//         console.log(payload.conversationId);

//         console.log("--------------------------------");

//         console.log("Payload:");
//         console.dir(payload, {
//             depth: null,
//         });

//         console.log("--------------------------------");

//         console.log("Broadcasting webrtc:answer");

//         client
//             .to(
//                 payload.conversationId,
//             )
//             .emit(
//                 "webrtc:answer",
//                 payload,
//             );

//         console.log("webrtc:answer emitted");

//         console.log("======================================================");
//         console.log("\n");
//     }

//     @SubscribeMessage(
//         "webrtc:candidate",
//     )
//     candidate(
//         @ConnectedSocket()
//         client: Socket,

//         @MessageBody()
//         payload: any,
//     ) {
//         console.log("\n");
//         console.log("======================================================");
//         console.log("📡 ICE CANDIDATE");
//         console.log("======================================================");

//         console.log("Socket:");
//         console.log(client.id);

//         console.log("--------------------------------");

//         console.log("Conversation:");
//         console.log(payload.conversationId);

//         console.log("--------------------------------");

//         console.log("Payload:");
//         console.dir(payload, {
//             depth: null,
//         });

//         console.log("--------------------------------");

//         console.log("Broadcasting webrtc:candidate");

//         client
//             .to(
//                 payload.conversationId,
//             )
//             .emit(
//                 "webrtc:candidate",
//                 payload,
//             );

//         console.log("webrtc:candidate emitted");

//         console.log("======================================================");
//         console.log("\n");
//     }
//     emitToEmployee(
//         employeeId: string,
//         event: string,
//         payload: any,
//     ) {
//         console.log("\n");
//         console.log("======================================================");
//         console.log("📤 EMIT TO EMPLOYEE");
//         console.log("======================================================");

//         console.log("Employee:");
//         console.log(employeeId);

//         console.log("--------------------------------");

//         console.log("Event:");
//         console.log(event);

//         console.log("--------------------------------");

//         console.log("Payload:");
//         console.dir(payload, {
//             depth: null,
//         });

//         console.log("--------------------------------");

//         console.log("Users Map");

//         console.table(
//             [...this.users.entries()],
//         );

//         console.log("--------------------------------");

//         const socketId =
//             this.users.get(
//                 employeeId,
//             );

//         console.log("Socket Found:");

//         console.log(socketId);

//         console.log("--------------------------------");

//         console.log("Employee Online:");

//         console.log(
//             this.users.has(
//                 employeeId,
//             ),
//         );

//         console.log("--------------------------------");

//         if (!socketId) {
//             console.log("❌ EMIT ABORTED");
//             console.log("Reason:");
//             console.log(
//                 "No socket found for employee.",
//             );

//             console.log("======================================================");
//             console.log("\n");

//             return;
//         }

//         console.log("Sending Event...");

//         this.server
//             .to(socketId)
//             .emit(
//                 event,
//                 payload,
//             );

//         console.log("--------------------------------");

//         console.log("Emit Complete");

//         console.log("Socket:");

//         console.log(socketId);

//         console.log("--------------------------------");

//         console.log("Event:");

//         console.log(event);

//         console.log("======================================================");
//         console.log("\n");
//     }
//     // =====================================================
// // Server Emit Helpers
// // =====================================================

// emitMessage(
//   conversationId: string,
//   message: any,
// ) {
//   console.log("\n");
//   console.log("======================================================");
//   console.log("📨 EMIT MESSAGE");
//   console.log("Conversation:");
//   console.log(conversationId);

//   this.server
//     .to(conversationId)
//     .emit(
//       "message:new",
//       message,
//     );

//   console.log("message:new emitted");
//   console.log("======================================================");
//   console.log("\n");
// }

// emitUpdatedMessage(
//   conversationId: string,
//   message: any,
// ) {
//   console.log("\n");
//   console.log("======================================================");
//   console.log("✏️ EMIT UPDATED MESSAGE");
//   console.log("Conversation:");
//   console.log(conversationId);

//   this.server
//     .to(conversationId)
//     .emit(
//       "message:updated",
//       message,
//     );

//   console.log("message:updated emitted");
//   console.log("======================================================");
//   console.log("\n");
// }

// emitDeletedMessage(
//   conversationId: string,
//   messageId: string,
// ) {
//   console.log("\n");
//   console.log("======================================================");
//   console.log("🗑️ EMIT DELETED MESSAGE");
//   console.log("Conversation:");
//   console.log(conversationId);

//   console.log("Message:");
//   console.log(messageId);

//   this.server
//     .to(conversationId)
//     .emit(
//       "message:deleted",
//       messageId,
//     );

//   console.log("message:deleted emitted");
//   console.log("======================================================");
//   console.log("\n");
// }

// emitConversationRead(
//   conversationId: string,
//   employeeId: string,
// ) {
//   console.log("\n");
//   console.log("======================================================");
//   console.log("👀 EMIT CONVERSATION READ");
//   console.log("Conversation:");
//   console.log(conversationId);

//   console.log("Employee:");
//   console.log(employeeId);

//   this.server
//     .to(conversationId)
//     .emit(
//       "conversation:read",
//       {
//         conversationId,
//         employeeId,
//       },
//     );

//   console.log("conversation:read emitted");
//   console.log("======================================================");
//   console.log("\n");
// }

// emitUserOnline(
//   employeeId: string,
// ) {
//   console.log("Broadcast user:online");
//   console.log(employeeId);

//   this.server.emit(
//     "user:online",
//     employeeId,
//   );
// }

// emitUserOffline(
//   employeeId: string,
// ) {
//   console.log("Broadcast user:offline");
//   console.log(employeeId);

//   this.server.emit(
//     "user:offline",
//     employeeId,
//   );
// }
// isOnline(
//   employeeId: string,
// ) {
//   return this.users.has(
//     employeeId,
//   );
// }

// isEmployeeOnline(
//   employeeId: string,
// ) {
//   return this.users.has(
//     employeeId,
//   );
// }

// getSocketId(
//   employeeId: string,
// ) {
//   return this.users.get(
//     employeeId,
//   );
// }
//     }

