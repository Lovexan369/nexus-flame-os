import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bot,
  Gauge,
  Layers,
  MessageSquare,
  Settings,
  Shield,
  Terminal,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FlameMark } from "@/components/flame-mark";
import { Badge } from "@/components/ui/badge";
import { APP_EDITION, APP_NAME } from "@/lib/catalog";
import { useFlame } from "@/lib/store";
import { cn } from "@/lib/utils";

const PRIMARY = [
  { to: "/", label: "Пульт", icon: Gauge },
  { to: "/messenger", label: "Тень", icon: MessageSquare },
  { to: "/gates", label: "Шлюзы", icon: Shield },
  { to: "/terminal", label: "Терминал", icon: Terminal },
] as const;

const MORE = [
  { to: "/plans", label: "Тарифы", icon: Layers },
  { to: "/agents", label: "Агенты", icon: Bot },
  { to: "/settings", label: "Настройки", icon: Settings },
] as const;

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const setHydrated = useFlame((s) => s.setHydrated);
  const creatorMode = useFlame((s) => s.creatorMode);
  const pending = useFlame(
    (s) => s.approvals.filter((a) => a.status === "approval_required").length,
  );
  const purgeExpired = useFlame((s) => s.purgeExpired);
  const [more, setMore] = useState(false);
  const now = useClock();

  useEffect(() => {
    let alive = true;
    const done = () => {
      if (alive) setHydrated();
    };
    void Promise.resolve(useFlame.persist.rehydrate()).then(done, done);
    return () => {
      alive = false;
    };
  }, [setHydrated]);

  useEffect(() => {
    const id = window.setInterval(() => purgeExpired(), 4000);
    return () => window.clearInterval(id);
  }, [purgeExpired]);

  useEffect(() => {
    setMore(false);
  }, [pathname]);

  const clock = now
    ? now.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "--:--:--";

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-border bg-surface md:flex">
        <div className="flex items-center gap-3 px-5 py-5">
          <FlameMark className="size-7" />
          <div>
            <p className="text-sm font-medium tracking-tight">{APP_NAME}</p>
            <p className="font-mono text-xs tracking-wider text-subtle uppercase">
              {APP_EDITION}
            </p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {[...PRIMARY, ...MORE].map((item) => (
            <NavLink
              key={item.to}
              {...item}
              active={pathname === item.to}
              badge={item.to === "/gates" && pending ? pending : undefined}
            />
          ))}
        </nav>
        <div className="px-5 py-4">
          <p className="font-mono text-xs tabular-nums text-subtle">{clock}</p>
          <p className="mt-1 text-xs text-muted">local_draft_only</p>
        </div>
      </aside>

      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-bg/92 px-4 py-3 backdrop-blur-sm md:hidden">
        <FlameMark className="size-6" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{APP_NAME}</p>
        </div>
        <Badge tone={creatorMode ? "ok" : "accent"}>
          {creatorMode ? "Creator" : "Paid"}
        </Badge>
        <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
          <span className="live-dot size-1.5 rounded-full bg-ok" />
          LIVE
        </span>
      </header>

      <div className="md:pl-56">
        <div className="hidden items-center justify-between border-b border-border px-8 py-4 md:flex">
          <div className="flex items-center gap-2">
            <span className="live-dot size-1.5 rounded-full bg-ok" />
            <span className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
              контур живой
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Badge tone={creatorMode ? "ok" : "accent"}>
              {creatorMode ? "Creator Mode" : "Монетизация"}
            </Badge>
            <span className="font-mono text-xs tabular-nums text-subtle">
              {clock}
            </span>
          </div>
        </div>
        <main className="px-4 pb-28 pt-6 md:px-8 md:pb-12 md:pt-8">
          {children}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden">
        <div className="grid grid-cols-5">
          {PRIMARY.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "relative flex min-h-14 flex-col items-center justify-center gap-1 text-xs tracking-wide",
                pathname === item.to ? "text-fg" : "text-subtle",
              )}
            >
              <item.icon className="size-4" strokeWidth={1.6} />
              {item.label}
              {item.to === "/gates" && pending > 0 ? (
                <span className="absolute top-1.5 right-4 size-1.5 rounded-full bg-accent" />
              ) : null}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setMore(true)}
            className={cn(
              "flex min-h-14 flex-col items-center justify-center gap-1 text-xs tracking-wide",
              MORE.some((m) => m.to === pathname) ? "text-fg" : "text-subtle",
            )}
          >
            <Layers className="size-4" strokeWidth={1.6} />
            Ещё
          </button>
        </div>
      </nav>

      {more ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Закрыть"
            className="absolute inset-0 bg-bg/70"
            onClick={() => setMore(false)}
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-xl bg-surface p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] shadow-[var(--shadow-lift)]">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium">Ещё</p>
              <button
                type="button"
                className="flex size-11 items-center justify-center text-muted"
                onClick={() => setMore(false)}
                aria-label="Закрыть"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="grid gap-1">
              {MORE.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex min-h-12 items-center gap-3 rounded-md px-3 text-sm text-fg hover:bg-elevated"
                >
                  <item.icon className="size-4 text-muted" strokeWidth={1.6} />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function NavLink({
  to,
  label,
  icon: Icon,
  active,
  badge,
}: {
  to: string;
  label: string;
  icon: typeof Gauge;
  active: boolean;
  badge?: number;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150",
        active ? "bg-elevated text-fg" : "text-muted hover:text-fg",
      )}
    >
      <Icon className="size-4" strokeWidth={1.6} />
      <span className="flex-1">{label}</span>
      {badge ? (
        <span className="font-mono text-xs tabular-nums text-accent">{badge}</span>
      ) : null}
    </Link>
  );
}
