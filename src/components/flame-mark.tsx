import { cn } from "@/lib/utils";

export function FlameMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-accent", className)}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M16.4 2.2c.4 5.6-6.2 7.6-6.2 15.1 0 5.4 2.8 11.5 5.8 11.5s5.8-6.1 5.8-11.5c0-7.5-5.8-9.5-5.4-15.1Z"
      />
    </svg>
  );
}
