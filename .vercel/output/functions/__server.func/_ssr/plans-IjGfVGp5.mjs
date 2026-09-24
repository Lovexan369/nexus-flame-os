import { o as PLANS } from "./catalog-CCmqPdfJ.mjs";
import { n as useFlame, t as cn } from "./store-CX4gbHLe.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Badge } from "./badge-Dn30A1_q.mjs";
import { n as PageHeader, t as Button } from "./button-BpiAyagE.mjs";
import { p as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plans-IjGfVGp5.js
var import_jsx_runtime = require_jsx_runtime();
function PlansPage() {
	const creatorMode = useFlame((s) => s.creatorMode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-5xl flex-col gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Monetization",
			title: creatorMode ? "Бесплатно навсегда" : "Три контура",
			description: creatorMode ? "Creator Mode включён. Кнопки оплаты скрыты, тарифы помечены как бесплатные. Выключить можно в настройках." : "Оплата только через Stripe Checkout. Из приложения списание не запускается.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: creatorMode ? "ok" : "accent",
				children: creatorMode ? "Creator Mode" : "Checkout"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 lg:grid-cols-3",
			children: PLANS.map((plan, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: cn("flex flex-col rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6", i === 1 && "lg:-translate-y-1"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-[0.16em] text-subtle uppercase",
						children: plan.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-3xl font-medium tracking-tight",
						children: [creatorMode ? "Free" : `$${plan.priceUsd}`, !creatorMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-1 text-sm font-normal text-muted",
							children: ["/ ", plan.cadence]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: plan.tagline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 flex-1 space-y-2",
						children: plan.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-ok" }), f]
						}, f))
					}),
					creatorMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "mt-6",
						disabled: true,
						children: "Включено в Creator Mode"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: plan.href,
							target: "_blank",
							rel: "noreferrer",
							children: ["Оплатить ", plan.name]
						})
					})
				]
			}, plan.id))
		})]
	});
}
//#endregion
export { PlansPage as component };
