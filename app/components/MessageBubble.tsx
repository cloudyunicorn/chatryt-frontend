import type { Message } from "@/app/types/chat";
import { BotIcon } from "./Icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
      <div className={`flex max-w-[85%] sm:max-w-[80%] gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
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
          className={`px-3.5 py-2.5 text-[13px] leading-relaxed min-h-[36px] overflow-hidden ${
            isUser
              ? "rounded-2xl rounded-br-md bg-primary text-primary-foreground shadow-sm"
              : "rounded-2xl rounded-bl-md bg-secondary/70 text-foreground border border-border/40 backdrop-blur-sm"
          }`}
        >
          {(!isUser && message.content === "") ? (
            <div className="flex items-center gap-1 h-full pt-1 px-1">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          ) : (
            <div className="markdown-content prose prose-sm prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <div className="relative my-3 rounded-lg overflow-hidden border border-border/40">
                        {match[1] && (
                          <div className="bg-muted px-3 py-1 text-[10px] font-mono text-muted-foreground border-b border-border/40 uppercase tracking-widest flex justify-between items-center">
                            <span>{match[1]}</span>
                          </div>
                        )}
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          className="!m-0 !bg-neutral-900/50 !text-[12px]"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className="bg-muted/50 px-1.5 py-0.5 rounded text-[12px] font-mono" {...props}>
                        {children}
                      </code>
                    );
                  },
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="pl-1">{children}</li>,
                  h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-1">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-bold mb-2 mt-1">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-bold mb-1 mt-1">{children}</h3>,
                  a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                      {children}
                    </a>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-3 border border-border/40 rounded-lg">
                      <table className="w-full text-left border-collapse">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
                  th: ({ children }) => <th className="p-2 border border-border/40 font-bold">{children}</th>,
                  td: ({ children }) => <td className="p-2 border border-border/40">{children}</td>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-primary/50 pl-3 italic my-2 text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
