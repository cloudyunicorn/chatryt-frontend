"use client";

import { useState, useCallback, useRef } from "react";
import type { Message } from "@/app/types/chat";
import { sendChatMessage } from "@/app/lib/api";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function generateSessionId() {
  return "xxxx-xxxx-xxxx".replace(/x/g, () =>
    Math.floor(Math.random() * 16).toString(16)
  );
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionIdRef = useRef<string>(generateSessionId());

  const sendMessage = useCallback(async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { id: generateId(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendChatMessage(trimmed, sessionIdRef.current);
      const assistantMsg: Message = {
        id: generateId(),
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const startNewChat = useCallback(() => {
    setMessages([]);
    setError(null);
    setIsLoading(false);
    sessionIdRef.current = generateSessionId();
  }, []);

  return {
    messages,
    isLoading,
    error,
    sessionId: sessionIdRef.current,
    sendMessage,
    startNewChat,
  };
}
