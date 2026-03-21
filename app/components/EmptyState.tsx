import { SparklesIcon } from "./Icons";
import { Button } from "@/components/ui/button";

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
    <div className="animate-fade-in flex flex-col items-center justify-center pt-24 md:pt-32 text-center px-4">
      <div className="mb-5 rounded-2xl bg-primary/10 p-4">
        <SparklesIcon />
      </div>

      <h2 className="shimmer-text mb-1.5 text-xl font-semibold tracking-tight">
        Hello! I&apos;m ChatRYT
      </h2>
      <p className="max-w-xs text-[13px] leading-relaxed text-muted-foreground">
        Your AI assistant. Ask me anything — from code to creative writing.
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <Button
            key={suggestion}
            variant="outline"
            size="sm"
            onClick={() => onSuggestionClick(suggestion)}
            className="rounded-full text-xs font-normal text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}
