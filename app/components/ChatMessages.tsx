"use client";

import { useEffect, useRef } from "react";
import type { Message } from "@/app/types/chat";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import EmptyState from "./EmptyState";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onSuggestionClick: (suggestion: string) => void;
}

export default function ChatMessages({
  messages,
  isLoading,
  error,
  onSuggestionClick,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const isEmpty = messages.length === 0;

  return (
    <main className="flex-1 overflow-y-auto px-4 py-6 md:px-0">
      <div className="mx-auto w-full max-w-2xl space-y-4">
        {/* Empty State */}
        {isEmpty && !isLoading && (
          <EmptyState onSuggestionClick={onSuggestionClick} />
        )}

        {/* Message Bubbles */}
        {messages.map((msg, index) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            animationDelay={`${index * 0.05}s`}
          />
        ))}

        {/* Typing Indicator */}
        {isLoading && <TypingIndicator />}

        {/* Error Message */}
        {error && (
          <div className="animate-fade-in-up flex justify-center">
            <div
              className="rounded-xl px-4 py-3 text-sm"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                color: "#fca5a5",
              }}
            >
              ⚠️ {error} — please check if the backend is running on port 8000.
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </main>
  );
}
