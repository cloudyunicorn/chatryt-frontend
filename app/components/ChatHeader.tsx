import { BotIcon, PlusIcon } from "./Icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onNewChat: () => void;
}

export default function ChatHeader({ onNewChat }: ChatHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-5 py-3.5 border-b border-border/50 bg-card/80 backdrop-blur-xl">
      {/* Brand */}
      <Avatar className="h-9 w-9 rounded-xl">
        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-white rounded-xl text-xs font-bold">
          <BotIcon size={18} />
        </AvatarFallback>
      </Avatar>

      <div className="leading-tight">
        <h1 className="text-sm font-semibold tracking-tight text-foreground">
          ChatRYT
        </h1>
        <p className="text-[11px] text-muted-foreground">
          Powered by GPT
        </p>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3">
        <Button
          onClick={onNewChat}
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground"
        >
          <PlusIcon size={14} />
          New Chat
        </Button>

        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] text-muted-foreground">
            Online
          </span>
        </div>
      </div>
    </header>
  );
}
