import { createFileRoute } from "@tanstack/react-router";
import { Send, Timer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatClock } from "@/lib/format";
import { useFlame } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_console/messenger")({
  component: MessengerPage,
});

function MessengerPage() {
  const messages = useFlame((s) => s.messages);
  const sendMessage = useFlame((s) => s.sendMessage);
  const [draft, setDraft] = useState("");
  const [burn, setBurn] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  function onSend() {
    sendMessage(draft, burn ? 60_000 : undefined);
    setDraft("");
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <PageHeader
        kicker="Shadow messenger"
        title="Vault на устройстве"
        description="Это не переписка с сервером. Текст остаётся в браузере. Сообщения с таймером исчезнут через минуту."
        action={<Badge tone="ok">device-only</Badge>}
      />

      <div className="flex min-h-[52vh] flex-col rounded-xl bg-surface shadow-[var(--shadow-border)]">
        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5 sm:px-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.from === "you" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-md px-3.5 py-2.5",
                  msg.from === "you"
                    ? "rounded-br-xs bg-accent text-accent-fg"
                    : "rounded-bl-xs bg-elevated text-fg",
                )}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p
                  className={cn(
                    "mt-1 flex items-center gap-1.5 font-mono text-xs tabular-nums",
                    msg.from === "you" ? "text-accent-fg/70" : "text-subtle",
                  )}
                >
                  {formatClock(msg.at)}
                  {msg.expiresAt ? <Timer className="size-3" /> : null}
                </p>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form
          className="border-t border-border p-3 sm:p-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSend();
          }}
        >
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Сообщение в vault…"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
          />
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex min-h-11 items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={burn}
                onChange={(e) => setBurn(e.target.checked)}
                className="size-4 accent-accent"
              />
              Сжечь через 60 секунд
            </label>
            <Button type="submit" disabled={!draft.trim()}>
              Отправить
              <Send className="size-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
