import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

let socket: Socket | null = null;

export function connectSocket(
  employeeId: string,
) {
  if (socket) {
    return socket;
  }

  socket = io(SOCKET_URL, {
    transports: ["websocket"],
    autoConnect: true,
    auth: {
      employeeId,
    },
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (!socket) {
    return;
  }

  socket.disconnect();
  socket = null;
}