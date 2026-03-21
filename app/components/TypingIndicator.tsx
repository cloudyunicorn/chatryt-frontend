import { BotIcon } from "./Icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function TypingIndicator() {
  return (
    <div className="animate-fade-in-up flex justify-start">
      <div className="flex gap-2.5">
        <Avatar className="h-7 w-7 shrink-0 rounded-lg mt-0.5">
          <AvatarFallback className="bg-secondary rounded-lg text-muted-foreground">
            <BotIcon size={14} />
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-secondary/70 border border-border/40 px-4 py-3">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </div>
  );
}
