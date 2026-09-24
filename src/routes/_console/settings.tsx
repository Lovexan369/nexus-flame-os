import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { OPERATOR_CODE } from "@/lib/catalog";
import { useFlame } from "@/lib/store";

export const Route = createFileRoute("/_console/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const creatorMode = useFlame((s) => s.creatorMode);
  const setCreatorMode = useFlame((s) => s.setCreatorMode);
  const operator = useFlame((s) => s.operator);
  const unlockOperator = useFlame((s) => s.unlockOperator);
  const lockOperator = useFlame((s) => s.lockOperator);
  const clearVault = useFlame((s) => s.clearVault);
  const [code, setCode] = useState("");

  function onUnlock() {
    if (code.trim() === OPERATOR_CODE) {
      unlockOperator();
      setCode("");
      toast("Операторский контур открыт");
    } else {
      toast("Код не принят");
    }
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-8">
      <PageHeader
        kicker="Settings"
        title="Контур владельца"
        description="Creator Mode отключает оплату целиком. Операторский код нужен только для отметок в очереди шлюзов — не для реальных платежей."
      />

      <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-medium">Отключить монетизацию</h2>
            <p className="mt-1 text-sm text-muted">
              Creator Mode. Тарифы становятся бесплатными, checkout скрывается.
            </p>
          </div>
          <Switch
            checked={creatorMode}
            onCheckedChange={setCreatorMode}
            aria-label="Creator Mode"
          />
        </div>
      </section>

      <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <h2 className="text-sm font-medium">Оператор</h2>
        {operator ? (
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-sm text-muted">Контур открыт на этом устройстве.</p>
            <Button variant="secondary" onClick={lockOperator}>
              Закрыть
            </Button>
          </div>
        ) : (
          <form
            className="mt-4 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              onUnlock();
            }}
          >
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Код доступа"
              autoComplete="off"
            />
            <Button type="submit">Открыть</Button>
          </form>
        )}
      </section>

      <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <h2 className="text-sm font-medium">Vault</h2>
        <p className="mt-1 text-sm text-muted">
          Стереть локальную переписку Shadow messenger.
        </p>
        <Button
          variant="danger"
          className="mt-4"
          onClick={() => {
            clearVault();
            toast("Vault очищен");
          }}
        >
          Очистить vault
        </Button>
      </section>

      <section className="rounded-xl bg-surface p-5 text-sm shadow-[var(--shadow-border)] sm:p-6">
        <h2 className="font-medium">Контур</h2>
        <Separator className="my-4" />
        <dl className="space-y-3 font-mono text-xs">
          <Row k="edition" v="Creator" />
          <Row k="XKC_MODE" v="local_draft_only" />
          <Row k="external_effects" v="blocked" />
          <Row k="payments" v="stripe checkout only" />
        </dl>
      </section>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-subtle">{k}</dt>
      <dd className="text-fg">{v}</dd>
    </div>
  );
}
