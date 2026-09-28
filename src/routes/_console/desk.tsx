import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SERVICES } from "@/lib/catalog";
import { useFlame } from "@/lib/store";

export const Route = createFileRoute("/_console/desk")({
  component: DeskPage,
});

function DeskPage() {
  const addLead = useFlame((s) => s.addLead);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState(SERVICES[0]?.name ?? "");
  const [comment, setComment] = useState("");

  function submit() {
    if (!contact.trim()) {
      toast("Укажите контакт");
      return;
    }
    addLead({
      name,
      contact,
      service,
      comment,
      action: "order",
    });
    setName("");
    setContact("");
    setComment("");
    toast("Заявка в контуре", {
      description: "Температура посчитана правилами, не обученной моделью.",
    });
  }

  const groups = [...new Set(SERVICES.map((s) => s.group))];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <PageHeader
        kicker="LeadPredict · стол"
        title="Заказать работу"
        description="Публичный стол студии внутри NEXUS FLAME. Заявка остаётся в этом контуре. Telegram-бот из браузера не запускается — нужен отдельный токен на сервере."
        action={
          <Button variant="secondary" asChild>
            <Link to="/leads">Открыть лиды</Link>
          </Button>
        }
      />

      <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <article
            key={group}
            className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]"
          >
            <p className="font-mono text-xs tracking-[0.16em] text-subtle uppercase">
              {group}
            </p>
            <ul className="mt-3 space-y-2">
              {SERVICES.filter((s) => s.group === group).map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-3 text-sm">
                  <span>{s.name}</span>
                  <span className="shrink-0 font-mono text-xs tabular-nums text-muted">
                    {s.price}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <h2 className="text-sm font-medium">Заявка</h2>
        <p className="mt-1 text-sm text-muted">
          Горячие слова вроде «заказать» поднимают температуру. Это правила, не CatBoost.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Input
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Telegram / email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <label className="mt-3 block text-xs text-subtle">Направление</label>
        <select
          className="mt-1 h-11 w-full rounded-sm bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          {SERVICES.map((s) => (
            <option key={s.id} value={s.name}>
              {s.group}: {s.name}
            </option>
          ))}
        </select>
        <Textarea
          className="mt-3"
          rows={4}
          placeholder="Что нужно сделать, сроки, бюджет"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className="mt-4" type="button" onClick={submit}>
          Отправить заявку
        </Button>
      </section>
    </div>
  );
}
