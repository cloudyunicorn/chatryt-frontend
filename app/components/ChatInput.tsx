"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { SendIcon } from "./Icons";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  externalValue?: string;
  onExternalValueConsumed?: () => void;
}

export default function ChatInput({
  onSend,
  isLoading,
  externalValue,
  onExternalValueConsumed,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle external value injection (from suggestion chips)
  useEffect(() => {
    if (externalValue) {
      setInput(externalValue);
      textareaRef.current?.focus();
      onExternalValueConsumed?.();
    }
  }, [externalValue, onExternalValueConsumed]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 150) + "px";
    }
  }, [input]);

  // Refocus after loading completes
  useEffect(() => {
    if (!isLoading) {
      textareaRef.current?.focus();
    }
  }, [isLoading]);

  function handleSubmit(e?: FormEvent) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <footer
      className="px-4 pb-5 pt-3 md:px-0"
      style={{ background: "var(--bg-primary)" }}
    >
      <form
        onSubmit={handleSubmit}
        className="input-glow glass-panel mx-auto flex w-full max-w-2xl items-end gap-3 px-4 py-3 transition-all duration-300"
      >
        <textarea
          ref={textareaRef}
          id="chat-input"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message…"
          disabled={isLoading}
          className="flex-1 resize-none border-none bg-transparent text-sm leading-relaxed outline-none placeholder:text-gray-500"
          style={{ color: "var(--text-primary)", maxHeight: 150 }}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          id="send-button"
          className="send-btn flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-white"
        >
          <SendIcon />
        </button>
      </form>
      <p
        className="mt-2 text-center text-xs"
        style={{ color: "var(--text-muted)" }}
      >
        ChatRYT can make mistakes. Consider verifying important information.
      </p>
    </footer>
  );
}
