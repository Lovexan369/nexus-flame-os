import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GATES, type GateId } from "@/lib/catalog";
import { formatWhen } from "@/lib/format";
import { useFlame } from "@/lib/store";

export const Route = createFileRoute("/_console/gates")({
  component: GatesPage,
});

function GatesPage() {
  const operator = useFlame((s) => s.operator);
  const approvals = useFlame((s) => s.approvals);
  const requestGate = useFlame((s) => s.requestGate);
  const resolveGate = useFlame((s) => s.resolveGate);
  const [gate, setGate] = useState<GateId>("deploy");
  const [reason, setReason] = useState("");

  function submit() {
    const item = requestGate(gate, reason);
    setReason("");
    toast("Запрос принят в очередь", {
      description: `${item.gate} · executable: false`,
    });
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <PageHeader
        kicker="XANKONG"
        title="Шлюзы внешних эффектов"
        description="Любой выход наружу останавливается здесь. Статус всегда approval_required. Исполнение из этого контура невозможно."
      />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {GATES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setGate(item.id)}
            className={
              gate === item.id
                ? "rounded-lg bg-elevated p-4 text-left shadow-[var(--shadow-border-hover)]"
                : "rounded-lg bg-surface p-4 text-left shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
            }
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium">{item.name}</p>
              <Badge tone={item.risk === "critical" ? "danger" : "warn"}>
                {item.risk}
              </Badge>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">{item.summary}</p>
          </button>
        ))}
      </section>

      <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <h2 className="text-sm font-medium">Запросить внешнее действие</h2>
        <p className="mt-1 text-sm text-muted">
          Выбрано: {GATES.find((g) => g.id === gate)?.name}. Ответ шлюза фиксирован.
        </p>
        <Textarea
          className="mt-4"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Зачем это нужно? Коротко, для журнала."
        />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="button" onClick={submit}>
            Поставить в очередь
          </Button>
          <p className="font-mono text-xs text-subtle">
            status: approval_required · executable: false
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium">Очередь</h2>
        {approvals.length === 0 ? (
          <p className="rounded-xl bg-surface px-5 py-8 text-sm text-muted shadow-[var(--shadow-border)]">
            Очередь пуста. Ни один внешний эффект не исполнен.
          </p>
        ) : (
          <ul className="space-y-2">
            {approvals.map((row) => (
              <li
                key={row.id}
                className="flex flex-col gap-3 rounded-lg bg-surface p-4 shadow-[var(--shadow-border)] sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium">{row.gate}</p>
                    <Badge
                      tone={
                        row.status === "denied"
                          ? "danger"
                          : row.status === "approved_local"
                            ? "ok"
                            : "warn"
                      }
                    >
                      {row.status}
                    </Badge>
                    <span className="font-mono text-xs text-subtle">
                      exec:false
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{row.reason}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs tabular-nums text-subtle">
                    {formatWhen(row.at)}
                  </span>
                  {operator && row.status === "approval_required" ? (
                    <>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => resolveGate(row.id, "approved_local")}
                      >
                        Локально
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => resolveGate(row.id, "denied")}
                      >
                        Отклонить
                      </Button>
                    </>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
        {!operator ? (
          <p className="mt-3 text-xs text-subtle">
            Отметки в очереди доступны после операторского кода в настройках. Это
            не включает реальное исполнение.
          </p>
        ) : null}
      </section>
    </div>
  );
}
