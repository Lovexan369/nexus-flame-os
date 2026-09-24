import type { ReactNode } from "react";

export function PageHeader({
  kicker,
  title,
  description,
  action,
}: {
  kicker?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl space-y-2">
        {kicker ? (
          <p className="font-mono text-xs tracking-[0.18em] text-subtle uppercase">
            {kicker}
          </p>
        ) : null}
        <h1 className="text-2xl font-medium tracking-tight text-fg sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="text-sm leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
