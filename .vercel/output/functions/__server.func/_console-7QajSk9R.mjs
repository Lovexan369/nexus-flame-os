import { i as __toESM } from "./_runtime.mjs";
import { a as MCP_TOOLS, t as AGENTS } from "./_ssr/catalog-CCmqPdfJ.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useFlame } from "./_ssr/store-CX4gbHLe.mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { t as Badge } from "./_ssr/badge-Dn30A1_q.mjs";
import { n as PageHeader, t as Button } from "./_ssr/button-BpiAyagE.mjs";
import { n as formatUptime, r as formatWhen } from "./_ssr/format-BjmPnDWL.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Shield, c as Radio, g as ArrowUpRight, u as Lock } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_console-7QajSk9R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DeckPage() {
	const creatorMode = useFlame((s) => s.creatorMode);
	const messages = useFlame((s) => s.messages);
	const approvals = useFlame((s) => s.approvals);
	const activity = useFlame((s) => s.activity);
	const startedAt = useFlame((s) => s.startedAt);
	const pending = approvals.filter((a) => a.status === "approval_required").length;
	const [uptime, setUptime] = (0, import_react.useState)("00:00:00");
	(0, import_react.useEffect)(() => {
		const tick = () => setUptime(formatUptime(startedAt));
		tick();
		const id = window.setInterval(tick, 1e3);
		return () => window.clearInterval(id);
	}, [startedAt]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-5xl flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Command deck",
				title: "Контур под контролем",
				description: "Локальный контур NEXUS FLAME. Внешние эффекты не исполняются. Creator Mode держит монетизацию выключенной, пока вы сами её не откроете."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Режим",
						value: creatorMode ? "Creator" : "Paid",
						hint: "монетизация"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Vault",
						value: String(messages.length),
						hint: "сообщений на устройстве"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Шлюзы",
						value: String(pending),
						hint: "ждут approval"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Uptime",
						value: uptime,
						hint: "сессия",
						mono: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-medium",
								children: "Состояние"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: "ok",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3" }), "local_draft_only"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusRow, {
									icon: Lock,
									title: "Shadow vault",
									text: "Сообщения не покидают устройство. Самоуничтожение по таймеру."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusRow, {
									icon: Shield,
									title: "XANKONG gates",
									text: "deploy, payment, publish и остальные внешние действия — executable: false."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusRow, {
									icon: Radio,
									title: "Терминал",
									text: "Запросы идут в Grok только по вашей команде. Без автозапуска."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col gap-2 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/gates",
									children: ["Открыть шлюзы", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/terminal",
									children: "Терминал"
								})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 text-sm font-medium",
						children: "Журнал"
					}), activity.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Пока тихо."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: activity.slice(0, 6).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-fg",
								children: row.text
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 font-mono text-xs tabular-nums text-subtle",
								children: formatWhen(row.at)
							})]
						}, row.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 text-sm font-medium",
							children: "Агенты"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid grid-cols-2 gap-2",
							children: AGENTS.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-md bg-elevated px-3 py-3 shadow-[var(--shadow-border)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm",
										children: agent.id
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: agent.status === "online" ? "size-1.5 rounded-full bg-ok" : "size-1.5 rounded-full bg-warn" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: agent.role
								})]
							}, agent.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							className: "mt-3 px-0",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/agents",
								children: ["Все агенты", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 text-sm font-medium",
						children: "MCP · draft only"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: MCP_TOOLS.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 font-mono text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-fg",
								children: tool.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-subtle",
								children: tool.mode
							})]
						}, tool.name))
					})]
				})]
			})
		]
	});
}
function Stat({ label, value, hint, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-wide text-subtle uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: mono ? "mt-2 font-mono text-2xl tabular-nums tracking-tight" : "mt-2 text-2xl font-medium tabular-nums tracking-tight",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: hint
			})
		]
	});
}
function StatusRow({ icon: Icon, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-0.5 flex size-8 items-center justify-center rounded-sm bg-elevated text-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "size-4",
				strokeWidth: 1.6
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: text
		})] })]
	});
}
//#endregion
export { DeckPage as component };
