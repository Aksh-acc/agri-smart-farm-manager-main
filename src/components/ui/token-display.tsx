
import { Sparkles } from "lucide-react";
import { useRewards } from "@/contexts/RewardsContext";
import { cn } from "@/lib/utils";

interface TokenDisplayProps {
  className?: string;
  showLabel?: boolean;
}

const TokenDisplay = ({ className, showLabel = true }: TokenDisplayProps) => {
  const { tokens } = useRewards();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
        <Sparkles className="h-4 w-4 text-amber-500 mr-1.5" />
        <span className="font-medium text-amber-700 dark:text-amber-300">{tokens}</span>
      </div>
      {showLabel && (
        <span className="text-sm text-muted-foreground">AgriTokens</span>
      )}
    </div>
  );
};

export default TokenDisplay;
