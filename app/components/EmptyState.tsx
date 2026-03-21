import { SparklesIcon } from "./Icons";

interface EmptyStateProps {
  onSuggestionClick: (suggestion: string) => void;
}

const SUGGESTIONS = [
  "Explain quantum computing",
  "Write a poem about space",
  "Help me debug my code",
];

export default function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center pt-28 text-center">
      <div className="mb-6">
        <SparklesIcon />
      </div>
      <h2 className="shimmer-text mb-2 text-2xl font-bold">
        Hello! I&apos;m ChatRYT
      </h2>
      <p
        className="max-w-sm text-sm leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        Your AI-powered assistant. Ask me anything — from coding questions to
        creative writing, I&apos;m here to help.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
            className="cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 hover:scale-105"
            style={{
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-secondary)",
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
