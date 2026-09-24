import { t as AGENTS } from "./catalog-CCmqPdfJ.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-rJRB6NHs.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askTerminal_createServerFn_handler = createServerRpc({
	id: "add8066169b8c8786a316e93be9621ff4b3beb18f542adc74f36627d97f81b43",
	name: "askTerminal",
	filename: "src/lib/ai.ts"
}, (opts) => askTerminal.__executeServer(opts));
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
}).handler(askTerminal_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Терминал сейчас недоступен."
	};
	const system = [
		(AGENTS.find((a) => a.id === data.agent) ?? AGENTS[0]).prompt,
		"Платформа: NEXUS FLAME × XANKONG. Режим XKC_MODE=local_draft_only.",
		"Внешние эффекты (платежи, деплой, публикация, вебхуки, реклама) запрещены и никогда не исполняются.",
		data.creatorMode ? "Creator Mode активен: всё бесплатно для владельца, монетизация отключена." : "Creator Mode выключен: тарифы Spark / Inferno / Supernova видимы, оплата только через Stripe Checkout.",
		"Отвечай на языке пользователя. Коротко, точно, без эмодзи и без маркетингового шума."
	].join(" ");
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 700,
			messages: [
				{
					role: "system",
					content: system
				},
				...data.history,
				{
					role: "user",
					content: data.prompt
				}
			]
		})
	});
	if (!res.ok) {
		if (res.status === 403 || res.status === 402) return {
			ok: false,
			error: "Квота терминала сейчас недоступна. Контур работает без модели."
		};
		if (res.status === 429) return {
			ok: false,
			error: "Слишком много запросов. Подождите немного."
		};
		return {
			ok: false,
			error: `Терминал вернул ${res.status}`
		};
	}
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "Пустой ответ модели"
	};
	return {
		ok: true,
		text
	};
});
//#endregion
export { askTerminal_createServerFn_handler };
