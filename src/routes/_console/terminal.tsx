import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { askTerminal } from "@/lib/ai";
import { AGENTS, type AgentId } from "@/lib/catalog";
import { formatClock } from "@/lib/format";
import { useFlame } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_console/terminal")({
  component: TerminalPage,
});

function TerminalPage() {
  const agent = useFlame((s) => s.agent);
  const setAgent = useFlame((s) => s.setAgent);
  const thread = useFlame((s) => s.thread);
  const pushTerminal = useFlame((s) => s.pushTerminal);
  const creatorMode = useFlame((s) => s.creatorMode);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const history = useMemo(
    () =>
      thread.map((t) => ({
        role: t.role,
        content: t.text,
      })),
    [thread],
  );

  async function submit() {
    const prompt = draft.trim();
    if (!prompt || busy) return;
    setDraft("");
    pushTerminal({ role: "user", agent, text: prompt });
    setBusy(true);
    try {
      const res = await askTerminal({
        data: { prompt, agent, history, creatorMode },
      });
      if (!res.ok) {
        toast(res.error);
        pushTerminal({
          role: "assistant",
          agent,
          text: res.error,
        });
      } else {
        pushTerminal({ role: "assistant", agent, text: res.text });
      }
    } catch {
      toast("Терминал не ответил");
    } finally {
      setBusy(false);
      requestAnimationFrame(() => {
        boxRef.current?.scrollTo({
          top: boxRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <PageHeader
        kicker="AI terminal"
        title="Разговор с контуром"
        description="Запрос уходит только когда вы нажимаете отправку. Модель не исполняет платежи, деплой и публикацию."
      />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {AGENTS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setAgent(item.id as AgentId)}
            className={cn(
              "flex h-11 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm transition-colors duration-150",
              agent === item.id
                ? "bg-accent text-accent-fg"
                : "bg-surface text-muted shadow-[var(--shadow-border)]",
            )}
          >
            <span
              className={
                item.status === "online"
                  ? "size-1.5 rounded-full bg-ok"
                  : "size-1.5 rounded-full bg-warn"
              }
            />
            {item.id}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
        <div
          ref={boxRef}
          className="max-h-[52vh] min-h-[36vh] space-y-4 overflow-y-auto px-4 py-5 font-mono text-sm sm:px-5"
        >
          {thread.length === 0 ? (
            <p className="text-muted">
              nexus@{agent.toLowerCase()}:~$ ждут команду
            </p>
          ) : (
            thread.map((turn) => (
              <div key={turn.id}>
                <p className="text-xs text-subtle">
                  {turn.role === "user" ? "you" : turn.agent} ·{" "}
                  {formatClock(turn.at)}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-fg">{turn.text}</p>
              </div>
            ))
          )}
          {busy ? <p className="text-subtle">думает…</p> : null}
        </div>
        <form
          className="flex items-end gap-2 border-t border-border p-3"
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <Textarea
            rows={2}
            className="min-h-12 font-mono"
            value={draft}
            disabled={busy}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`сообщение для ${agent}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void submit();
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            disabled={busy || !draft.trim()}
            aria-label="Отправить"
          >
            <ArrowUp className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
