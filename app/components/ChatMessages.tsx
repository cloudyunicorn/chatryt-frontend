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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      // Direct DOM scroll is 100% reliable across all mobile browsers
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const isEmpty = messages.length === 0;

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain scroll-smooth">
      <div className="mx-auto w-full max-w-2xl space-y-3 px-4 py-5 md:px-0">
        {isEmpty && !isLoading && (
          <EmptyState onSuggestionClick={onSuggestionClick} />
        )}

        {messages.map((msg, index) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            animationDelay={`${index * 0.04}s`}
          />
        ))}

        {isLoading && <TypingIndicator />}

        {error && (
          <div className="animate-fade-in-up flex justify-center">
            <div className="rounded-lg px-3.5 py-2.5 text-xs bg-destructive/10 border border-destructive/20 text-red-300">
              ⚠️ {error} — check if the backend is running.
            </div>
          </div>
        )}

        {/* Dummy spacer for padding at the bottom */}
        <div className="h-4 w-full" />
      </div>
    </div>
  );
}
