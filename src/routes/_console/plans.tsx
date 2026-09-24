import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/catalog";
import { useFlame } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_console/plans")({
  component: PlansPage,
});

function PlansPage() {
  const creatorMode = useFlame((s) => s.creatorMode);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <PageHeader
        kicker="Monetization"
        title={creatorMode ? "Бесплатно навсегда" : "Три контура"}
        description={
          creatorMode
            ? "Creator Mode включён. Кнопки оплаты скрыты, тарифы помечены как бесплатные. Выключить можно в настройках."
            : "Оплата только через Stripe Checkout. Из приложения списание не запускается."
        }
        action={
          <Badge tone={creatorMode ? "ok" : "accent"}>
            {creatorMode ? "Creator Mode" : "Checkout"}
          </Badge>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {PLANS.map((plan, i) => (
          <article
            key={plan.id}
            className={cn(
              "flex flex-col rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
              i === 1 && "lg:-translate-y-1",
            )}
          >
            <p className="font-mono text-xs tracking-[0.16em] text-subtle uppercase">
              {plan.name}
            </p>
            <p className="mt-3 text-3xl font-medium tracking-tight">
              {creatorMode ? "Free" : `$${plan.priceUsd}`}
              {!creatorMode ? (
                <span className="ml-1 text-sm font-normal text-muted">
                  / {plan.cadence}
                </span>
              ) : null}
            </p>
            <p className="mt-2 text-sm text-muted">{plan.tagline}</p>
            <ul className="mt-5 flex-1 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-ok" />
                  {f}
                </li>
              ))}
            </ul>
            {creatorMode ? (
              <Button variant="secondary" className="mt-6" disabled>
                Включено в Creator Mode
              </Button>
            ) : (
              <Button className="mt-6" asChild>
                <a href={plan.href} target="_blank" rel="noreferrer">
                  Оплатить {plan.name}
                </a>
              </Button>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
