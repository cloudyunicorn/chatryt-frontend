import { BotIcon, PlusIcon } from "./Icons";

interface ChatHeaderProps {
  onNewChat: () => void;
}

export default function ChatHeader({ onNewChat }: ChatHeaderProps) {
  return (
    <header
      className="flex items-center gap-3 px-6 py-4"
      style={{
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      {/* Brand */}
      <div
        className="flex items-center justify-center rounded-xl"
        style={{
          width: 38,
          height: 38,
          background: "var(--accent-gradient)",
        }}
      >
        <BotIcon size={20} />
      </div>
      <div>
        <h1 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
          ChatRYT
        </h1>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Powered by GPT-4o mini
        </p>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-4">
        {/* New Chat button */}
        <button
          onClick={onNewChat}
          id="new-chat-button"
          className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:scale-105"
          style={{
            background: "var(--bg-tertiary)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-secondary)",
          }}
        >
          <PlusIcon size={14} />
          New Chat
        </button>

        {/* Status dot */}
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e88" }}
          />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Online
          </span>
        </div>
      </div>
    </header>
  );
}
