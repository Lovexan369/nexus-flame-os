import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useFlame, t as cn } from "./store-CX4gbHLe.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Badge } from "./badge-Dn30A1_q.mjs";
import { n as PageHeader, t as Button } from "./button-BpiAyagE.mjs";
import { t as formatClock } from "./format-BjmPnDWL.mjs";
import { r as Timer, s as Send } from "../_libs/lucide-react.mjs";
import { t as Textarea } from "./textarea-C6e7z5x6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/messenger-DV-kZrHq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MessengerPage() {
	const messages = useFlame((s) => s.messages);
	const sendMessage = useFlame((s) => s.sendMessage);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [burn, setBurn] = (0, import_react.useState)(false);
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages.length]);
	function onSend() {
		sendMessage(draft, burn ? 6e4 : void 0);
		setDraft("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-2xl flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Shadow messenger",
			title: "Vault на устройстве",
			description: "Это не переписка с сервером. Текст остаётся в браузере. Сообщения с таймером исчезнут через минуту.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: "ok",
				children: "device-only"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-[52vh] flex-col rounded-xl bg-surface shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 space-y-3 overflow-y-auto px-4 py-5 sm:px-5",
				children: [messages.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex", msg.from === "you" ? "justify-end" : "justify-start"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("max-w-[85%] rounded-md px-3.5 py-2.5", msg.from === "you" ? "rounded-br-xs bg-accent text-accent-fg" : "rounded-bl-xs bg-elevated text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed",
							children: msg.text
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: cn("mt-1 flex items-center gap-1.5 font-mono text-xs tabular-nums", msg.from === "you" ? "text-accent-fg/70" : "text-subtle"),
							children: [formatClock(msg.at), msg.expiresAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-3" }) : null]
						})]
					})
				}, msg.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "border-t border-border p-3 sm:p-4",
				onSubmit: (e) => {
					e.preventDefault();
					onSend();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					placeholder: "Сообщение в vault…",
					rows: 3,
					onKeyDown: (e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							onSend();
						}
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-2 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: burn,
							onChange: (e) => setBurn(e.target.checked),
							className: "size-4 accent-accent"
						}), "Сжечь через 60 секунд"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: !draft.trim(),
						children: ["Отправить", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })]
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { MessengerPage as component };
