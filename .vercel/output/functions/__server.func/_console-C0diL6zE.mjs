import { i as __toESM } from "./_runtime.mjs";
import { n as APP_EDITION, r as APP_NAME } from "./_ssr/catalog-CCmqPdfJ.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useFlame, t as cn } from "./_ssr/store-CX4gbHLe.mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { t as Badge } from "./_ssr/badge-Dn30A1_q.mjs";
import { d as useRouterState, m as Outlet, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Shield, d as Layers, f as Gauge, i as Terminal, l as MessageSquare, m as Bot, o as Settings, t as X } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_console-C0diL6zE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FlameMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 32 32",
		className: cn("text-accent", className),
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M16.4 2.2c.4 5.6-6.2 7.6-6.2 15.1 0 5.4 2.8 11.5 5.8 11.5s5.8-6.1 5.8-11.5c0-7.5-5.8-9.5-5.4-15.1Z"
		})
	});
}
var PRIMARY = [
	{
		to: "/",
		label: "Пульт",
		icon: Gauge
	},
	{
		to: "/messenger",
		label: "Тень",
		icon: MessageSquare
	},
	{
		to: "/gates",
		label: "Шлюзы",
		icon: Shield
	},
	{
		to: "/terminal",
		label: "Терминал",
		icon: Terminal
	}
];
var MORE = [
	{
		to: "/plans",
		label: "Тарифы",
		icon: Layers
	},
	{
		to: "/agents",
		label: "Агенты",
		icon: Bot
	},
	{
		to: "/settings",
		label: "Настройки",
		icon: Settings
	}
];
function useClock() {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setNow(/* @__PURE__ */ new Date());
		const id = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	return now;
}
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const setHydrated = useFlame((s) => s.setHydrated);
	const creatorMode = useFlame((s) => s.creatorMode);
	const pending = useFlame((s) => s.approvals.filter((a) => a.status === "approval_required").length);
	const purgeExpired = useFlame((s) => s.purgeExpired);
	const [more, setMore] = (0, import_react.useState)(false);
	const now = useClock();
	(0, import_react.useEffect)(() => {
		let alive = true;
		const done = () => {
			if (alive) setHydrated();
		};
		Promise.resolve(useFlame.persist.rehydrate()).then(done, done);
		return () => {
			alive = false;
		};
	}, [setHydrated]);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => purgeExpired(), 4e3);
		return () => window.clearInterval(id);
	}, [purgeExpired]);
	(0, import_react.useEffect)(() => {
		setMore(false);
	}, [pathname]);
	const clock = now ? now.toLocaleTimeString("ru-RU", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	}) : "--:--:--";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-border bg-surface md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 px-5 py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlameMark, { className: "size-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium tracking-tight",
							children: APP_NAME
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-wider text-subtle uppercase",
							children: APP_EDITION
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-1 flex-col gap-1 px-3",
						children: [...PRIMARY, ...MORE].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							...item,
							active: pathname === item.to,
							badge: item.to === "/gates" && pending ? pending : void 0
						}, item.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tabular-nums text-subtle",
							children: clock
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: "local_draft_only"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-bg/92 px-4 py-3 backdrop-blur-sm md:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlameMark, { className: "size-6" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0 flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: APP_NAME
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: creatorMode ? "ok" : "accent",
						children: creatorMode ? "Creator" : "Paid"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 font-mono text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-dot size-1.5 rounded-full bg-ok" }), "LIVE"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:pl-56",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center justify-between border-b border-border px-8 py-4 md:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-dot size-1.5 rounded-full bg-ok" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs tracking-[0.16em] text-muted uppercase",
							children: "контур живой"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: creatorMode ? "ok" : "accent",
							children: creatorMode ? "Creator Mode" : "Монетизация"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs tabular-nums text-subtle",
							children: clock
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "px-4 pb-28 pt-6 md:px-8 md:pb-12 md:pt-8",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-5",
					children: [PRIMARY.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("relative flex min-h-14 flex-col items-center justify-center gap-1 text-xs tracking-wide", pathname === item.to ? "text-fg" : "text-subtle"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
								className: "size-4",
								strokeWidth: 1.6
							}),
							item.label,
							item.to === "/gates" && pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1.5 right-4 size-1.5 rounded-full bg-accent" }) : null
						]
					}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMore(true),
						className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-xs tracking-wide", MORE.some((m) => m.to === pathname) ? "text-fg" : "text-subtle"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
							className: "size-4",
							strokeWidth: 1.6
						}), "Ещё"]
					})]
				})
			}),
			more ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-40 md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Закрыть",
					className: "absolute inset-0 bg-bg/70",
					onClick: () => setMore(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 rounded-t-xl bg-surface p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] shadow-[var(--shadow-lift)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: "Ещё"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-11 items-center justify-center text-muted",
							onClick: () => setMore(false),
							"aria-label": "Закрыть",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-1",
						children: MORE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: "flex min-h-12 items-center gap-3 rounded-md px-3 text-sm text-fg hover:bg-elevated",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
								className: "size-4 text-muted",
								strokeWidth: 1.6
							}), item.label]
						}, item.to))
					})]
				})]
			}) : null
		]
	});
}
function NavLink({ to, label, icon: Icon, active, badge }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("flex min-h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150", active ? "bg-elevated text-fg" : "text-muted hover:text-fg"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "size-4",
				strokeWidth: 1.6
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex-1",
				children: label
			}),
			badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs tabular-nums text-accent",
				children: badge
			}) : null
		]
	});
}
function ConsoleLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { ConsoleLayout as component };
