import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AGENTS, CHANNELS } from "@/lib/catalog";
import { useFlame } from "@/lib/store";

export const Route = createFileRoute("/_console/agents")({
  component: AgentsPage,
});

function AgentsPage() {
  const setAgent = useFlame((s) => s.setAgent);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <PageHeader
        kicker="AIUIOG"
        title="Агенты и каналы"
        description="Ростер из AIUIOG внутри NEXUS FLAME. OpenClaw-каналы показаны честно: живой только web. Telegram не стартует без токена на отдельном сервере."
      />

      <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <h2 className="mb-3 text-sm font-medium">OpenClaw</h2>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((ch) => (
            <li
              key={ch.id}
              className="flex items-center justify-between gap-3 rounded-md bg-elevated px-3 py-3 shadow-[var(--shadow-border)]"
            >
              <div>
                <p className="text-sm">{ch.name}</p>
                <p className="text-xs text-muted">{ch.note}</p>
              </div>
              <Badge tone={ch.enabled ? "ok" : "neutral"}>
                {ch.enabled ? "on" : "off"}
              </Badge>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-3 md:grid-cols-2">
        {AGENTS.map((agent) => (
          <article
            key={agent.id}
            className="flex flex-col rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-medium tracking-tight">{agent.id}</h2>
                <p className="text-sm text-muted">{agent.role}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={agent.status === "online" ? "ok" : "warn"}>
                  {agent.status}
                </Badge>
                <Badge>{agent.tier}</Badge>
              </div>
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
              {agent.blurb}
            </p>
            <Button variant="secondary" className="mt-5" asChild>
              <Link to="/terminal" onClick={() => setAgent(agent.id)}>
                Открыть в терминале
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
