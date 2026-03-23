import { BotIcon, PlusIcon, PanelLeftIcon } from "./Icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  onNewChat: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function ChatHeader({ 
  onNewChat, 
  onToggleSidebar,
  isSidebarOpen 
}: ChatHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-5 py-3.5 border-b border-border/50 bg-card/80 backdrop-blur-xl">
      {/* Sidebar Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleSidebar}
        className={cn(
          "h-9 w-9 rounded-xl transition-colors",
          !isSidebarOpen && "bg-accent/50"
        )}
      >
        <PanelLeftIcon size={18} className={cn("transition-transform duration-300", !isSidebarOpen && "rotate-180")} />
      </Button>

      <div className="h-4 w-px bg-border/50 mx-1" />

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
          Powered by Supabase Memory
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

        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] text-emerald-500 font-medium">
            Live
          </span>
        </div>
      </div>
    </header>
  );
}
