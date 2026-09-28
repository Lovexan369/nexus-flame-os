import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatWhen } from "@/lib/format";
import type { LeadTemp } from "@/lib/catalog";
import { useFlame } from "@/lib/store";

export const Route = createFileRoute("/_console/leads")({
  component: LeadsPage,
});

const COLS: LeadTemp[] = ["Горячий", "Тёплый", "Холодный"];

function LeadsPage() {
  const leads = useFlame((s) => s.leads);
  const convertLead = useFlame((s) => s.convertLead);
  const hot = leads.filter((l) => l.temperature === "Горячий" && !l.converted).length;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <PageHeader
        kicker="LeadPredict · CRM"
        title="Воронка лидов"
        description="Стол пишет сюда. Оценка — правила по ключевым словам. Обученная CatBoost-модель появится, когда будут исторические сделки."
        action={
          <Button asChild>
            <Link to="/desk">Новая заявка</Link>
          </Button>
        }
      />

      <section className="grid gap-3 sm:grid-cols-3">
        <Stat label="Всего" value={String(leads.length)} />
        <Stat label="Горячие" value={String(hot)} />
        <Stat
          label="Сделки"
          value={String(leads.filter((l) => l.converted).length)}
        />
      </section>

      {leads.length === 0 ? (
        <p className="rounded-xl bg-surface px-5 py-8 text-sm text-muted shadow-[var(--shadow-border)]">
          Лидов нет. Откройте стол и оставьте заявку — она появится в этой воронке.
        </p>
      ) : (
        <div className="grid gap-3 lg:grid-cols-3">
          {COLS.map((col) => (
            <section
              key={col}
              className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]"
            >
              <h2 className="mb-3 text-sm font-medium">{col}</h2>
              <ul className="space-y-2">
                {leads
                  .filter((l) => l.temperature === col)
                  .map((lead) => (
                    <li
                      key={lead.id}
                      className="rounded-md bg-elevated p-3 shadow-[var(--shadow-border)]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium">{lead.name}</p>
                        <span className="font-mono text-xs tabular-nums text-subtle">
                          {(lead.probability * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted">{lead.service}</p>
                      {lead.comment ? (
                        <p className="mt-1 text-sm text-muted">{lead.comment}</p>
                      ) : null}
                      <p className="mt-2 font-mono text-xs text-subtle">
                        {lead.contact || "без контакта"} · {formatWhen(lead.at)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        {lead.converted ? (
                          <Badge tone="ok">сделка</Badge>
                        ) : (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => convertLead(lead.id)}
                          >
                            В сделку
                          </Button>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface p-4 shadow-[var(--shadow-border)]">
      <p className="text-xs tracking-wide text-subtle uppercase">{label}</p>
      <p className="mt-2 text-2xl font-medium tabular-nums">{value}</p>
    </div>
  );
}
