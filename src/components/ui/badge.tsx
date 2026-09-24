import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "ok" | "warn" | "danger";

const tones: Record<Tone, string> = {
  neutral: "text-muted bg-elevated",
  accent: "text-accent bg-accent/12",
  ok: "text-ok bg-ok/12",
  warn: "text-warn bg-warn/12",
  danger: "text-danger bg-danger/12",
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
