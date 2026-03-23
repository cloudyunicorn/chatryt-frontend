"use client";

import { MessageSquareIcon, PlusIcon, BotIcon } from "./Icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ChatThread } from "@/app/lib/api";

interface SidebarProps {
  threads: ChatThread[];
  currentThreadId: string;
  onSelectThread: (id: string) => void;
  onNewChat: () => void;
  onClose?: () => void;
  isOpen?: boolean;
}

function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  
  // If today
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // If this week
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 7 && days > 0) {
    return date.toLocaleDateString([], { weekday: 'short' });
  }

  // If this year
  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
  
  return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: '2-digit' });
}

export default function Sidebar({
  threads,
  currentThreadId,
  onSelectThread,
  onNewChat,
  onClose,
  isOpen = true,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "flex flex-col border-r border-border/50 bg-card/80 lg:bg-card/30 backdrop-blur-xl transition-all duration-300 z-50",
          "fixed inset-y-0 left-0 lg:static",
          isOpen 
            ? "w-64 translate-x-0 opacity-100" 
            : "w-64 -translate-x-full lg:w-0 lg:overflow-hidden lg:opacity-0 lg:translate-x-0 px-0 border-none"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border/50">
          <Button
            onClick={onNewChat}
            variant="outline"
            className="w-full justify-start gap-2 rounded-xl bg-background/50 hover:bg-accent border-border/50 transition-all active:scale-[0.98]"
          >
            <PlusIcon size={16} />
            <span className="text-sm font-medium">New Chat</span>
          </Button>
        </div>

        {/* Chat History List */}
        <ScrollArea className="flex-1 px-2 py-4">
          <div className="space-y-1">
            <h2 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
              Chat History
            </h2>
            
            {threads.length === 0 ? (
              <div className="px-3 py-8 text-center">
                <p className="text-xs text-muted-foreground">No recent chats</p>
              </div>
            ) : (
              threads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => onSelectThread(thread.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group relative",
                    currentThreadId === thread.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <div className={cn(
                    "p-1.5 rounded-lg transition-colors",
                    currentThreadId === thread.id ? "bg-primary/20" : "bg-muted/30 group-hover:bg-muted/50"
                  )}>
                    <MessageSquareIcon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">
                      {thread.title}
                    </p>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <p className="text-[10px] opacity-60 truncate">
                        {thread.id.slice(0, 8)}...
                      </p>
                      <p className="text-[10px] opacity-40 shrink-0">
                        {formatDate(thread.updated_at)}
                      </p>
                    </div>
                  </div>
                  {currentThreadId === thread.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full" />
                  )}
                </button>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Footer / User Profile or Info */}
        <div className="p-4 mt-auto border-t border-border/50">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center text-primary">
              <BotIcon size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate leading-none">ChatRYT v1.0</p>
              <p className="text-[10px] text-muted-foreground truncate">Persistent memory active</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
