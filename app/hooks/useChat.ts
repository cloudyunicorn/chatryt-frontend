"use client";

import { useState, useCallback, useRef } from "react";
import type { Message } from "@/app/types/chat";
import { sendStreamMessage } from "@/app/lib/api";

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
    const assistantId = generateId();
    const placeholderMsg: Message = { id: assistantId, role: "assistant", content: "" };
    
    setMessages((prev) => [...prev, userMsg, placeholderMsg]);
    setIsLoading(true);
    setError(null);

    try {
      await sendStreamMessage(trimmed, sessionIdRef.current, (chunk) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        );
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
      // Remove the empty placeholder if something failed before streaming started
      setMessages((prev) => prev.filter(msg => msg.id !== assistantId || msg.content !== ""));
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
