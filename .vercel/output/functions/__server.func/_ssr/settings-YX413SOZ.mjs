import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useFlame, t as cn } from "./store-CX4gbHLe.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as PageHeader, t as Button } from "./button-BpiAyagE.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-YX413SOZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-sm bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-ring/70", className),
		...props
	});
}
function Separator({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "separator",
		className: cn("h-px w-full bg-border", className)
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full bg-elevated shadow-[var(--shadow-border)] transition-[background-color] duration-150 data-[state=checked]:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-1 rounded-full bg-fg transition-transform duration-150 data-[state=checked]:translate-x-6 data-[state=checked]:bg-accent-fg" })
	});
}
function SettingsPage() {
	const creatorMode = useFlame((s) => s.creatorMode);
	const setCreatorMode = useFlame((s) => s.setCreatorMode);
	const operator = useFlame((s) => s.operator);
	const unlockOperator = useFlame((s) => s.unlockOperator);
	const lockOperator = useFlame((s) => s.lockOperator);
	const clearVault = useFlame((s) => s.clearVault);
	const [code, setCode] = (0, import_react.useState)("");
	function onUnlock() {
		if (code.trim() === "NEXUS-FLAME-777") {
			unlockOperator();
			setCode("");
			toast("Операторский контур открыт");
		} else toast("Код не принят");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-xl flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Settings",
				title: "Контур владельца",
				description: "Creator Mode отключает оплату целиком. Операторский код нужен только для отметок в очереди шлюзов — не для реальных платежей."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Отключить монетизацию"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Creator Mode. Тарифы становятся бесплатными, checkout скрывается."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: creatorMode,
						onCheckedChange: setCreatorMode,
						"aria-label": "Creator Mode"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: "Оператор"
				}), operator ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Контур открыт на этом устройстве."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: lockOperator,
						children: "Закрыть"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 flex flex-col gap-3 sm:flex-row",
					onSubmit: (e) => {
						e.preventDefault();
						onUnlock();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: code,
						onChange: (e) => setCode(e.target.value),
						placeholder: "Код доступа",
						autoComplete: "off"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Открыть"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Vault"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Стереть локальную переписку Shadow messenger."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						className: "mt-4",
						onClick: () => {
							clearVault();
							toast("Vault очищен");
						},
						children: "Очистить vault"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-surface p-5 text-sm shadow-[var(--shadow-border)] sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Контур"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "space-y-3 font-mono text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "edition",
								v: "Creator"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "XKC_MODE",
								v: "local_draft_only"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "external_effects",
								v: "blocked"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "payments",
								v: "stripe checkout only"
							})
						]
					})
				]
			})
		]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-subtle",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-fg",
			children: v
		})]
	});
}
//#endregion
export { SettingsPage as component };
