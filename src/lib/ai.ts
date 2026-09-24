import { createServerFn } from "@tanstack/react-start";
import { AGENTS, type AgentId } from "@/lib/catalog";

type HistoryItem = { role: "user" | "assistant"; content: string };

type AskInput = {
  prompt: string;
  agent: AgentId;
  history: HistoryItem[];
  creatorMode: boolean;
};

export const askTerminal = createServerFn({ method: "POST" })
  .validator((input: AskInput) => {
    const prompt = (input?.prompt ?? "").trim().slice(0, 4000);
    if (!prompt) throw new Error("Пустой запрос");
    const agent = AGENTS.some((a) => a.id === input.agent)
      ? input.agent
      : ("Coordinator" as AgentId);
    const history = Array.isArray(input.history)
      ? input.history.slice(-10).map((h) => ({
          role: h.role === "assistant" ? ("assistant" as const) : ("user" as const),
          content: String(h.content ?? "").slice(0, 4000),
        }))
      : [];
    return {
      prompt,
      agent,
      history,
      creatorMode: Boolean(input.creatorMode),
    };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Терминал сейчас недоступен." };
    }

    const agent = AGENTS.find((a) => a.id === data.agent) ?? AGENTS[0];
    const system = [
      agent.prompt,
      "Платформа: NEXUS FLAME × XANKONG. Режим XKC_MODE=local_draft_only.",
      "Внешние эффекты (платежи, деплой, публикация, вебхуки, реклама) запрещены и никогда не исполняются.",
      data.creatorMode
        ? "Creator Mode активен: всё бесплатно для владельца, монетизация отключена."
        : "Creator Mode выключен: тарифы Spark / Inferno / Supernova видимы, оплата только через Stripe Checkout.",
      "Отвечай на языке пользователя. Коротко, точно, без эмодзи и без маркетингового шума.",
    ].join(" ");

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 700,
        messages: [
          { role: "system", content: system },
          ...data.history,
          { role: "user", content: data.prompt },
        ],
      }),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 402) {
        return {
          ok: false as const,
          error: "Квота терминала сейчас недоступна. Контур работает без модели.",
        };
      }
      if (res.status === 429) {
        return {
          ok: false as const,
          error: "Слишком много запросов. Подождите немного.",
        };
      }
      return { ok: false as const, error: `Терминал вернул ${res.status}` };
    }

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false as const, error: "Пустой ответ модели" };
    return { ok: true as const, text };
  });
