"use client";

import { io, Socket } from "socket.io-client";
import type { KaraokeState, SingerPayload } from "@/types/karaoke";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io({
      transports: ["websocket", "polling"],
      autoConnect: true,
    });
  }
  return socket;
}

export function subscribeToState(
  callback: (state: KaraokeState) => void
): () => void {
  const s = getSocket();

  const handler = (state: KaraokeState) => callback(state);
  s.on("state-update", handler);

  return () => {
    s.off("state-update", handler);
  };
}

export function triggerDisplay(data: SingerPayload): void {
  getSocket().emit("trigger-display", data);
}

export function clearScreen(): void {
  getSocket().emit("clear-screen");
}
