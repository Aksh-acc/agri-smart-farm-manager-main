
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  decorative?: boolean;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "gradient" | "dots" | "dashed" | "animated" | "glowing" | "wave" | "lottie";
  className?: string;
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    { className, orientation = "horizontal", decorative = true, variant = "default", ...props },
    ref
  ) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "gradient":
          return orientation === "horizontal" 
            ? "bg-gradient-to-r from-transparent via-border to-transparent" 
            : "bg-gradient-to-b from-transparent via-border to-transparent";
        case "dots":
          return "bg-border bg-dotted";
        case "dashed":
          return "bg-border [border-style:dashed]";
        case "animated":
          return orientation === "horizontal" 
            ? "bg-gradient-to-r from-primary-300/50 via-accent-blue/50 to-primary-300/50 bg-[length:200%_auto] animate-shimmer" 
            : "bg-gradient-to-b from-primary-300/50 via-accent-blue/50 to-primary-300/50 bg-[length:auto_200%] animate-shimmer-vertical";
        case "glowing":
          return orientation === "horizontal" 
            ? "bg-primary-500/20 shadow-[0_0_5px_1px_rgba(76,175,80,0.5)] animate-pulse-subtle" 
            : "bg-primary-500/20 shadow-[0_0_5px_1px_rgba(76,175,80,0.5)] animate-pulse-subtle";
        case "wave":
          return orientation === "horizontal"
            ? "bg-transparent overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary-500/40 before:to-transparent before:animate-wave"
            : "bg-transparent overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-primary-500/40 before:to-transparent before:animate-wave-vertical";
        case "lottie":
          return "bg-transparent h-auto"; // For lottie animations, height is controlled by the animation
        default:
          return "bg-border";
      }
    };
    
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 relative",
          getVariantClasses(),
          orientation === "horizontal" ? (variant === "lottie" ? "h-auto w-full" : "h-[1px] w-full") : "h-full w-[1px]",
          className
        )}
        {...props}
      />
    );
  }
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
