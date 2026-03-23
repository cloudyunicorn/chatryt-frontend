"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { Message } from "@/app/types/chat";
import { sendStreamMessage, fetchThreads, fetchHistory, type ChatThread } from "@/app/lib/api";

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
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const sessionIdRef = useRef<string>(generateSessionId());
  
  // Track continuous user identity in local storage
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    // Only access localStorage on client side
    let storedId = localStorage.getItem("chatryt_user_id");
    if (!storedId) {
      storedId = "usr_" + generateSessionId();
      localStorage.setItem("chatryt_user_id", storedId);
    }
    setUserId(storedId);
  }, []);

  const refreshThreads = useCallback(async () => {
    if (!userId) return; // Wait until userId is loaded
    try {
      const allThreads = await fetchThreads(userId);
      setThreads(allThreads);
    } catch (err) {
      console.error("Failed to refresh threads:", err);
    }
  }, [userId]);

  const sendMessage = useCallback(async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isLoading || !userId) return;

    const isFirstMessage = messages.length === 0;
    const userMsg: Message = { id: generateId(), role: "user", content: trimmed };
    const assistantId = generateId();
    const placeholderMsg: Message = { id: assistantId, role: "assistant", content: "" };
    
    setMessages((prev) => [...prev, userMsg, placeholderMsg]);
    setIsLoading(true);
    setError(null);

    try {
      await sendStreamMessage(trimmed, sessionIdRef.current, userId, (chunk) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        );
      });
      // After first message in a new thread, refresh thread list to show title
      if (isFirstMessage) {
        refreshThreads();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
      // Remove the empty placeholder if something failed before streaming started
      setMessages((prev) => prev.filter(msg => msg.id !== assistantId || msg.content !== ""));
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages.length, refreshThreads, userId]);

  const startNewChat = useCallback(() => {
    setMessages([]);
    setError(null);
    setIsLoading(false);
    sessionIdRef.current = generateSessionId();
  }, []);

  const loadThread = useCallback(async (threadId: string) => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);
    setMessages([]); // Clear current chat
    sessionIdRef.current = threadId;

    try {
      const history = await fetchHistory(threadId, userId);
      setMessages(history);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load history");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      refreshThreads();
    }
  }, [refreshThreads, userId]);

  return {
    messages,
    isLoading,
    error,
    threads,
    sessionId: sessionIdRef.current,
    sendMessage,
    startNewChat,
    loadThread,
    refreshThreads,
  };
}
