import type { Message } from "@/app/types/chat";
import { BotIcon } from "./Icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
      <div className={`flex max-w-[80%] gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar */}
        {!isUser && (
          <Avatar className="h-7 w-7 shrink-0 rounded-lg mt-0.5">
            <AvatarFallback className="bg-secondary rounded-lg text-muted-foreground">
              <BotIcon size={14} />
            </AvatarFallback>
          </Avatar>
        )}

        {/* Bubble */}
        <div
          className={`px-3.5 py-2.5 text-[13px] leading-relaxed ${
            isUser
              ? "rounded-2xl rounded-br-md bg-primary text-primary-foreground"
              : "rounded-2xl rounded-bl-md bg-secondary/70 text-foreground border border-border/40"
          }`}
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
