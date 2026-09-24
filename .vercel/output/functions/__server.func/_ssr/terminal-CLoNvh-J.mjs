import { i as __toESM } from "../_runtime.mjs";
import { t as AGENTS } from "./catalog-CCmqPdfJ.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useFlame, t as cn } from "./store-CX4gbHLe.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as PageHeader, t as Button } from "./button-BpiAyagE.mjs";
import { t as formatClock } from "./format-BjmPnDWL.mjs";
import { h as ArrowUp } from "../_libs/lucide-react.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as Textarea } from "./textarea-C6e7z5x6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terminal-CLoNvh-J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askTerminal = createServerFn({ method: "POST" }).validator((input) => {
	const prompt = (input?.prompt ?? "").trim().slice(0, 4e3);
	if (!prompt) throw new Error("Пустой запрос");
	return {
		prompt,
		agent: AGENTS.some((a) => a.id === input.agent) ? input.agent : "Coordinator",
		history: Array.isArray(input.history) ? input.history.slice(-10).map((h) => ({
			role: h.role === "assistant" ? "assistant" : "user",
			content: String(h.content ?? "").slice(0, 4e3)
		})) : [],
		creatorMode: Boolean(input.creatorMode)
	};
}).handler(createSsrRpc("add8066169b8c8786a316e93be9621ff4b3beb18f542adc74f36627d97f81b43"));
function TerminalPage() {
	const agent = useFlame((s) => s.agent);
	const setAgent = useFlame((s) => s.setAgent);
	const thread = useFlame((s) => s.thread);
	const pushTerminal = useFlame((s) => s.pushTerminal);
	const creatorMode = useFlame((s) => s.creatorMode);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const boxRef = (0, import_react.useRef)(null);
	const history = (0, import_react.useMemo)(() => thread.map((t) => ({
		role: t.role,
		content: t.text
	})), [thread]);
	async function submit() {
		const prompt = draft.trim();
		if (!prompt || busy) return;
		setDraft("");
		pushTerminal({
			role: "user",
			agent,
			text: prompt
		});
		setBusy(true);
		try {
			const res = await askTerminal({ data: {
				prompt,
				agent,
				history,
				creatorMode
			} });
			if (!res.ok) {
				toast(res.error);
				pushTerminal({
					role: "assistant",
					agent,
					text: res.error
				});
			} else pushTerminal({
				role: "assistant",
				agent,
				text: res.text
			});
		} catch {
			toast("Терминал не ответил");
		} finally {
			setBusy(false);
			requestAnimationFrame(() => {
				boxRef.current?.scrollTo({
					top: boxRef.current.scrollHeight,
					behavior: "smooth"
				});
			});
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-3xl flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "AI terminal",
				title: "Разговор с контуром",
				description: "Запрос уходит только когда вы нажимаете отправку. Модель не исполняет платежи, деплой и публикацию."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: AGENTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setAgent(item.id),
					className: cn("flex h-11 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm transition-colors duration-150", agent === item.id ? "bg-accent text-accent-fg" : "bg-surface text-muted shadow-[var(--shadow-border)]"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: item.status === "online" ? "size-1.5 rounded-full bg-ok" : "size-1.5 rounded-full bg-warn" }), item.id]
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: boxRef,
					className: "max-h-[52vh] min-h-[36vh] space-y-4 overflow-y-auto px-4 py-5 font-mono text-sm sm:px-5",
					children: [thread.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted",
						children: [
							"nexus@",
							agent.toLowerCase(),
							":~$ ждут команду"
						]
					}) : thread.map((turn) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-subtle",
						children: [
							turn.role === "user" ? "you" : turn.agent,
							" ·",
							" ",
							formatClock(turn.at)
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 whitespace-pre-wrap text-fg",
						children: turn.text
					})] }, turn.id)), busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-subtle",
						children: "думает…"
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex items-end gap-2 border-t border-border p-3",
					onSubmit: (e) => {
						e.preventDefault();
						submit();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 2,
						className: "min-h-12 font-mono",
						value: draft,
						disabled: busy,
						onChange: (e) => setDraft(e.target.value),
						placeholder: `сообщение для ${agent}`,
						onKeyDown: (e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								submit();
							}
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "icon",
						disabled: busy || !draft.trim(),
						"aria-label": "Отправить",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
					})]
				})]
			})
		]
	});
}
//#endregion
export { TerminalPage as component };
