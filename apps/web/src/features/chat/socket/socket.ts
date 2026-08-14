import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_API_URL ??
  "http://localhost:5000";

let socket: Socket | null = null;

let currentEmployeeId: string | null = null;

// =====================================================
// Connect
// =====================================================

export function connectSocket(
  employeeId: string,
): Socket {
  // Reuse existing connection for same user
  if (
    socket &&
    socket.connected &&
    currentEmployeeId === employeeId
  ) {
    return socket;
  }

  // Cleanup previous socket
  if (socket) {
    socket.removeAllListeners();

    socket.disconnect();

    socket = null;
  }

  currentEmployeeId =
    employeeId;

  socket = io(
    SOCKET_URL,
    {
      transports: [
        "websocket",
      ],

      autoConnect: true,

      reconnection: true,

      reconnectionAttempts: Infinity,

      reconnectionDelay: 1000,

      auth: {
        employeeId,
      },
    },
  );

  socket.on(
    "connect",
    () => {
      console.log(
        "[Socket] Connected:",
        socket?.id,
      );

      socket?.emit(
        "user:join",
        employeeId,
      );
    },
  );

  socket.on(
    "disconnect",
    (reason) => {
      console.log(
        "[Socket] Disconnected:",
        reason,
      );
    },
  );

  socket.on(
    "connect_error",
    (error) => {
      console.error(
        "[Socket] Connection Error:",
        error.message,
      );
    },
  );

  return socket;
}

// =====================================================
// Get Socket
// =====================================================

export function getSocket():
  | Socket
  | null {
  return socket;
}

// =====================================================
// Disconnect
// =====================================================

export function disconnectSocket() {
  if (!socket) {
    return;
  }

  socket.removeAllListeners();

  socket.disconnect();

  socket = null;

  currentEmployeeId = null;
}

// =====================================================
// Call Events
// =====================================================

export function startCall(
  payload: unknown,
) {
  socket?.emit(
    "call:start",
    payload,
  );
}

export function acceptCall(
  payload: unknown,
) {
  socket?.emit(
    "call:accept",
    payload,
  );
}

export function rejectCall(
  payload: unknown,
) {
  socket?.emit(
    "call:reject",
    payload,
  );
}

export function endCall(
  payload: unknown,
) {
  socket?.emit(
    "call:end",
    payload,
  );
}

// =====================================================
// WebRTC
// =====================================================

export function sendOffer(
  payload: unknown,
) {
  socket?.emit(
    "webrtc:offer",
    payload,
  );
}

export function sendAnswer(
  payload: unknown,
) {
  socket?.emit(
    "webrtc:answer",
    payload,
  );
}

export function sendCandidate(
  payload: unknown,
) {
  socket?.emit(
    "webrtc:candidate",
    payload,
  );
}