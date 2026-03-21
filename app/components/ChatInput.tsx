"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { SendIcon } from "./Icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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

  useEffect(() => {
    if (externalValue) {
      setInput(externalValue);
      textareaRef.current?.focus();
      onExternalValueConsumed?.();
    }
  }, [externalValue, onExternalValueConsumed]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 150) + "px";
    }
  }, [input]);

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
    <footer className="px-4 pb-4 pt-2 md:px-0 bg-background">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-2xl items-end gap-2 rounded-xl border border-border/60 bg-card/60 backdrop-blur-lg px-3 py-2.5 transition-all duration-200 focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20"
      >
        <Textarea
          ref={textareaRef}
          id="chat-input"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message ChatRYT…"
          disabled={isLoading}
          className="flex-1 min-h-[24px] max-h-[150px] resize-none border-none bg-transparent shadow-none focus-visible:ring-0 text-base md:text-[13px] leading-relaxed p-0 py-1 placeholder:text-muted-foreground/60"
        />
        <Button
          type="submit"
          disabled={!input.trim() || isLoading}
          size="icon"
          className="h-8 w-8 shrink-0 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-30"
        >
          <SendIcon />
        </Button>
      </form>
      <p className="mt-1.5 text-center text-[10px] text-muted-foreground/50">
        ChatRYT can make mistakes. Verify important info.
      </p>
    </footer>
  );
}
