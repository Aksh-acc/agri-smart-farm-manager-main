
import { LucideProps } from "lucide-react";
import { forwardRef } from "react";

export const Seedling = forwardRef<SVGSVGElement, LucideProps>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        ref={ref}
        {...props}
      >
        <path d="M12 22v-9" />
        <path d="M9 10.034c-.809.506-1.692.984-2.617 1.400a3.822 3.822 0 0 1-1.334.333 3.25 3.25 0 0 1-2.667-1.083 3.25 3.25 0 0 1 0-4.6A3.25 3.25 0 0 1 5.05 5c.568 0 1.068.08 1.485.217 1.11.363 2.192.9 3.17 1.667L12 8.056l2.296-1.173c.978-.768 2.06-1.304 3.17-1.667.417-.138.917-.217 1.485-.217a3.25 3.25 0 0 1 2.667 1.083 3.25 3.25 0 0 1 0 4.6 3.25 3.25 0 0 1-2.667 1.084 3.822 3.822 0 0 1-1.333-.334c-.926-.415-1.81-.893-2.618-1.4L12 11.666z" />
      </svg>
    );
  }
);

Seedling.displayName = "Seedling";
