"use client";

import { useState, useCallback, useEffect } from "react";
import { useChat } from "@/app/hooks/useChat";
import ChatHeader from "@/app/components/ChatHeader";
import ChatMessages from "@/app/components/ChatMessages";
import ChatInput from "@/app/components/ChatInput";
import Sidebar from "@/app/components/Sidebar";

export default function ChatPage() {
  const { 
    messages, 
    isLoading, 
    error, 
    threads, 
    sessionId, 
    sendMessage, 
    startNewChat, 
    loadThread 
  } = useChat();
  
  const [pendingSuggestion, setPendingSuggestion] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Set initial sidebar state based on screen size
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setPendingSuggestion(suggestion);
  }, []);

  const handleSuggestionConsumed = useCallback(() => {
    setPendingSuggestion("");
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    // We only want to auto-close if it's currently open
    // And usually only on mobile, but closing it always on action is fine
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  const handleSelectThread = useCallback((id: string) => {
    loadThread(id);
    closeSidebar();
  }, [loadThread, closeSidebar]);

  const handleNewChat = useCallback(() => {
    startNewChat();
    closeSidebar();
  }, [startNewChat, closeSidebar]);

  return (
    <div className="flex h-dvh bg-background overflow-hidden text-foreground">
      {/* Sidebar */}
      <Sidebar
        threads={threads}
        currentThreadId={sessionId}
        onSelectThread={handleSelectThread}
        onNewChat={handleNewChat}
        onClose={() => setIsSidebarOpen(false)}
        isOpen={isSidebarOpen}
      />

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col relative min-w-0">
        <ChatHeader 
          onNewChat={startNewChat} 
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

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
    </div>
  );
}
