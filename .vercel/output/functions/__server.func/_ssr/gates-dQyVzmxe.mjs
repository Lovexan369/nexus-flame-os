import { i as __toESM } from "../_runtime.mjs";
import { i as GATES } from "./catalog-CCmqPdfJ.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useFlame } from "./store-CX4gbHLe.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Badge } from "./badge-Dn30A1_q.mjs";
import { n as PageHeader, t as Button } from "./button-BpiAyagE.mjs";
import { r as formatWhen } from "./format-BjmPnDWL.mjs";
import { t as Textarea } from "./textarea-C6e7z5x6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gates-dQyVzmxe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GatesPage() {
	const operator = useFlame((s) => s.operator);
	const approvals = useFlame((s) => s.approvals);
	const requestGate = useFlame((s) => s.requestGate);
	const resolveGate = useFlame((s) => s.resolveGate);
	const [gate, setGate] = (0, import_react.useState)("deploy");
	const [reason, setReason] = (0, import_react.useState)("");
	function submit() {
		const item = requestGate(gate, reason);
		setReason("");
		toast("Запрос принят в очередь", { description: `${item.gate} · executable: false` });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-5xl flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "XANKONG",
				title: "Шлюзы внешних эффектов",
				description: "Любой выход наружу останавливается здесь. Статус всегда approval_required. Исполнение из этого контура невозможно."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: GATES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setGate(item.id),
					className: gate === item.id ? "rounded-lg bg-elevated p-4 text-left shadow-[var(--shadow-border-hover)]" : "rounded-lg bg-surface p-4 text-left shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: item.risk === "critical" ? "danger" : "warn",
							children: item.risk
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs leading-relaxed text-muted",
						children: item.summary
					})]
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Запросить внешнее действие"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							"Выбрано: ",
							GATES.find((g) => g.id === gate)?.name,
							". Ответ шлюза фиксирован."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						className: "mt-4",
						value: reason,
						onChange: (e) => setReason(e.target.value),
						placeholder: "Зачем это нужно? Коротко, для журнала."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-3 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							onClick: submit,
							children: "Поставить в очередь"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-subtle",
							children: "status: approval_required · executable: false"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm font-medium",
					children: "Очередь"
				}),
				approvals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl bg-surface px-5 py-8 text-sm text-muted shadow-[var(--shadow-border)]",
					children: "Очередь пуста. Ни один внешний эффект не исполнен."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: approvals.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-3 rounded-lg bg-surface p-4 shadow-[var(--shadow-border)] sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: row.gate
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: row.status === "denied" ? "danger" : row.status === "approved_local" ? "ok" : "warn",
										children: row.status
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs text-subtle",
										children: "exec:false"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: row.reason
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs tabular-nums text-subtle",
								children: formatWhen(row.at)
							}), operator && row.status === "approval_required" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => resolveGate(row.id, "approved_local"),
								children: "Локально"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => resolveGate(row.id, "denied"),
								children: "Отклонить"
							})] }) : null]
						})]
					}, row.id))
				}),
				!operator ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-subtle",
					children: "Отметки в очереди доступны после операторского кода в настройках. Это не включает реальное исполнение."
				}) : null
			] })
		]
	});
}
//#endregion
export { GatesPage as component };
