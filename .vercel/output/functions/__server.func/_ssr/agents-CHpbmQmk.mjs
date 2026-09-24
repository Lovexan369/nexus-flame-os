import { t as AGENTS } from "./catalog-CCmqPdfJ.mjs";
import { n as useFlame } from "./store-CX4gbHLe.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Badge } from "./badge-Dn30A1_q.mjs";
import { n as PageHeader, t as Button } from "./button-BpiAyagE.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agents-CHpbmQmk.js
var import_jsx_runtime = require_jsx_runtime();
function AgentsPage() {
	const setAgent = useFlame((s) => s.setAgent);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-5xl flex-col gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Roster",
			title: "Шесть агентов контура",
			description: "Свободный доступ у Coordinator, Engineer и Content. Остальные открываются тарифами — либо сразу, если Creator Mode включён."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: AGENTS.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "flex flex-col rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-medium tracking-tight",
							children: agent.id
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: agent.role
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: agent.status === "online" ? "ok" : "warn",
								children: agent.status
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: agent.tier })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 flex-1 text-sm leading-relaxed text-muted",
						children: agent.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "mt-5",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terminal",
							onClick: () => setAgent(agent.id),
							children: "Открыть в терминале"
						})
					})
				]
			}, agent.id))
		})]
	});
}
//#endregion
export { AgentsPage as component };
