import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Lock, Radio, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AGENTS, MCP_TOOLS } from "@/lib/catalog";
import { formatUptime, formatWhen } from "@/lib/format";
import { useFlame } from "@/lib/store";

export const Route = createFileRoute("/_console/")({
  component: DeckPage,
});

function DeckPage() {
  const creatorMode = useFlame((s) => s.creatorMode);
  const messages = useFlame((s) => s.messages);
  const approvals = useFlame((s) => s.approvals);
  const activity = useFlame((s) => s.activity);
  const startedAt = useFlame((s) => s.startedAt);
  const pending = approvals.filter((a) => a.status === "approval_required").length;
  const [uptime, setUptime] = useState("00:00:00");

  useEffect(() => {
    const tick = () => setUptime(formatUptime(startedAt));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [startedAt]);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <PageHeader
        kicker="Command deck"
        title="Контур под контролем"
        description="Локальный контур NEXUS FLAME. Внешние эффекты не исполняются. Creator Mode держит монетизацию выключенной, пока вы сами её не откроете."
      />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Режим" value={creatorMode ? "Creator" : "Paid"} hint="монетизация" />
        <Stat
          label="Vault"
          value={String(messages.length)}
          hint="сообщений на устройстве"
        />
        <Stat label="Шлюзы" value={String(pending)} hint="ждут approval" />
        <Stat
          label="Uptime"
          value={uptime}
          hint="сессия"
          mono
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <article className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-sm font-medium">Состояние</h2>
            <Badge tone="ok">
              <Radio className="size-3" />
              local_draft_only
            </Badge>
          </div>
          <ul className="space-y-4">
            <StatusRow
              icon={Lock}
              title="Shadow vault"
              text="Сообщения не покидают устройство. Самоуничтожение по таймеру."
            />
            <StatusRow
              icon={Shield}
              title="XANKONG gates"
              text="deploy, payment, publish и остальные внешние действия — executable: false."
            />
            <StatusRow
              icon={Radio}
              title="Терминал"
              text="Запросы идут в Grok только по вашей команде. Без автозапуска."
            />
          </ul>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button asChild>
              <Link to="/gates">
                Открыть шлюзы
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/terminal">Терминал</Link>
            </Button>
          </div>
        </article>

        <article className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
          <h2 className="mb-4 text-sm font-medium">Журнал</h2>
          {activity.length === 0 ? (
            <p className="text-sm text-muted">Пока тихо.</p>
          ) : (
            <ul className="space-y-3">
              {activity.slice(0, 6).map((row) => (
                <li key={row.id} className="flex items-start justify-between gap-3">
                  <p className="text-sm text-fg">{row.text}</p>
                  <span className="shrink-0 font-mono text-xs tabular-nums text-subtle">
                    {formatWhen(row.at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
          <h2 className="mb-4 text-sm font-medium">Агенты</h2>
          <ul className="grid grid-cols-2 gap-2">
            {AGENTS.map((agent) => (
              <li
                key={agent.id}
                className="rounded-md bg-elevated px-3 py-3 shadow-[var(--shadow-border)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm">{agent.id}</p>
                  <span
                    className={
                      agent.status === "online"
                        ? "size-1.5 rounded-full bg-ok"
                        : "size-1.5 rounded-full bg-warn"
                    }
                  />
                </div>
                <p className="mt-1 text-xs text-muted">{agent.role}</p>
              </li>
            ))}
          </ul>
          <Button variant="ghost" className="mt-3 px-0" asChild>
            <Link to="/agents">
              Все агенты
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </article>

        <article className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
          <h2 className="mb-4 text-sm font-medium">MCP · draft only</h2>
          <ul className="space-y-2">
            {MCP_TOOLS.map((tool) => (
              <li
                key={tool.name}
                className="flex items-center justify-between gap-3 font-mono text-xs"
              >
                <span className="truncate text-fg">{tool.name}</span>
                <span className="shrink-0 text-subtle">{tool.mode}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  mono,
}: {
  label: string;
  value: string;
  hint: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-lg bg-surface p-4 shadow-[var(--shadow-border)]">
      <p className="text-xs tracking-wide text-subtle uppercase">{label}</p>
      <p
        className={
          mono
            ? "mt-2 font-mono text-2xl tabular-nums tracking-tight"
            : "mt-2 text-2xl font-medium tabular-nums tracking-tight"
        }
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}

function StatusRow({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Lock;
  title: string;
  text: string;
}) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex size-8 items-center justify-center rounded-sm bg-elevated text-muted">
        <Icon className="size-4" strokeWidth={1.6} />
      </span>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted">{text}</p>
      </div>
    </li>
  );
}
