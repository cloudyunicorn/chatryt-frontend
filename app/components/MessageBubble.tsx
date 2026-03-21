import type { Message } from "@/app/types/chat";
import { BotIcon } from "./Icons";

interface MessageBubbleProps {
  message: Message;
  animationDelay?: string;
}

export default function MessageBubble({ message, animationDelay = "0s" }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`animate-fade-in-up flex ${isUser ? "justify-end" : "justify-start"}`}
      style={{ animationDelay }}
    >
      <div className="flex max-w-[85%] gap-3 md:max-w-[75%]">
        {/* Assistant avatar */}
        {!isUser && (
          <div
            className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <BotIcon size={16} />
          </div>
        )}

        {/* Bubble */}
        <div
          className={`px-4 py-3 text-sm leading-relaxed ${isUser ? "msg-user" : "msg-assistant"}`}
        >
          {message.content.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
