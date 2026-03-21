import { BotIcon } from "./Icons";

export default function TypingIndicator() {
  return (
    <div className="animate-fade-in-up flex justify-start">
      <div className="flex max-w-[75%] gap-3">
        <div
          className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{
            background: "var(--bg-tertiary)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <BotIcon size={16} />
        </div>
        <div className="msg-assistant flex items-center gap-1.5 px-5 py-4">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </div>
  );
}
