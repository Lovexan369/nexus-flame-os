import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AGENTS } from "@/lib/catalog";
import { useFlame } from "@/lib/store";

export const Route = createFileRoute("/_console/agents")({
  component: AgentsPage,
});

function AgentsPage() {
  const setAgent = useFlame((s) => s.setAgent);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <PageHeader
        kicker="Roster"
        title="Шесть агентов контура"
        description="Свободный доступ у Coordinator, Engineer и Content. Остальные открываются тарифами — либо сразу, если Creator Mode включён."
      />

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
            <Button
              variant="secondary"
              className="mt-5"
              asChild
            >
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
