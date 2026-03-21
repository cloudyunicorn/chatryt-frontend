"use client";

import { useState, useCallback } from "react";
import { useChat } from "@/app/hooks/useChat";
import ChatHeader from "@/app/components/ChatHeader";
import ChatMessages from "@/app/components/ChatMessages";
import ChatInput from "@/app/components/ChatInput";

export default function ChatPage() {
  const { messages, isLoading, error, sendMessage, startNewChat } = useChat();
  const [pendingSuggestion, setPendingSuggestion] = useState<string>("");

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setPendingSuggestion(suggestion);
  }, []);

  const handleSuggestionConsumed = useCallback(() => {
    setPendingSuggestion("");
  }, []);

  return (
    <div className="flex h-screen flex-col" style={{ background: "var(--bg-primary)" }}>
      <ChatHeader onNewChat={startNewChat} />

      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSuggestionClick={handleSuggestionClick}
      />

      <ChatInput
        onSend={sendMessage}
        isLoading={isLoading}
        externalValue={pendingSuggestion}
        onExternalValueConsumed={handleSuggestionConsumed}
      />
    </div>
  );
}
