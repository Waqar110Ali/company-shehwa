import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

import {
  connectSocket,
  disconnectSocket,
  getSocket,
} from "../socket/socket";

interface Props {
  employeeId?: string;

  conversationId?: string;

  onMessage?(): void;

  onConversationUpdate?(): void;
}

export function useChatSocket({
  employeeId,
  conversationId,
  onMessage,
  onConversationUpdate,
}: Props) {
  const queryClient =
    useQueryClient();

  // =====================================================
  // Connect Socket
  // =====================================================

  useEffect(() => {
    if (!employeeId) {
      return;
    }

    console.log(
      "Connecting socket for employee:",
      employeeId,
    );

    const socket =
      connectSocket(employeeId);

    // Join immediately
    socket.emit(
      "user:join",
      employeeId,
    );

    socket.on(
      "connect",
      () => {
        console.log(
          "Socket Connected:",
          socket.id,
        );
      },
    );

    socket.on(
      "disconnect",
      () => {
        console.log(
          "Socket Disconnected",
        );
      },
    );

    return () => {
      disconnectSocket();
    };
  }, [employeeId]);

  // =====================================================
  // Join Conversation
  // =====================================================

  useEffect(() => {
    const socket =
      getSocket();

    if (
      !socket ||
      !conversationId
    ) {
      return;
    }

    console.log(
      "Joining conversation:",
      conversationId,
    );

    socket.emit(
      "conversation:join",
      conversationId,
    );

    return () => {
      socket.emit(
        "conversation:leave",
        conversationId,
      );
    };
  }, [conversationId]);

  // =====================================================
  // Socket Events
  // =====================================================

  useEffect(() => {
    const socket =
      getSocket();

    if (!socket) {
      return;
    }

    const refresh = () => {
      queryClient.invalidateQueries({
        queryKey: [
          "chat",
          "messages",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "chat",
          "conversations",
        ],
      });

      onMessage?.();

      onConversationUpdate?.();
    };

    socket.on(
      "message:new",
      refresh,
    );

    socket.on(
      "message:updated",
      refresh,
    );

    socket.on(
      "message:deleted",
      refresh,
    );

    socket.on(
      "conversation:read",
      refresh,
    );

    socket.on(
      "user:online",
      refresh,
    );

    socket.on(
      "user:offline",
      refresh,
    );

    socket.onAny(
      (
        event,
        payload,
      ) => {
        console.log(
          "SOCKET EVENT:",
          event,
          payload,
        );
      },
    );

    return () => {
      socket.off(
        "message:new",
        refresh,
      );

      socket.off(
        "message:updated",
        refresh,
      );

      socket.off(
        "message:deleted",
        refresh,
      );

      socket.off(
        "conversation:read",
        refresh,
      );

      socket.off(
        "user:online",
        refresh,
      );

      socket.off(
        "user:offline",
        refresh,
      );

      socket.offAny();
    };
  }, [
    queryClient,
    onMessage,
    onConversationUpdate,
  ]);
}