"use client";

import { useEffect, useRef } from "react";
import type { Message } from "@/app/types/chat";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import EmptyState from "./EmptyState";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const isEmpty = messages.length === 0;

  return (
    <ScrollArea className="flex-1">
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

        <div ref={bottomRef} className="h-px w-full" />
      </div>
    </ScrollArea>
  );
}
