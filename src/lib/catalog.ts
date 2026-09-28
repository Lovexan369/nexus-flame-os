export const APP_NAME = "NEXUS FLAME";
export const APP_EDITION = "XANKONG · Creator Edition";

export const OPERATOR_CODE = "NEXUS-FLAME-777";

export type PlanId = "spark" | "inferno" | "supernova";

export const PLANS: {
  id: PlanId;
  name: string;
  priceUsd: number;
  cadence: string;
  tagline: string;
  features: string[];
  href: string;
}[] = [
  {
    id: "spark",
    name: "Spark",
    priceUsd: 99,
    cadence: "мес",
    tagline: "Контур для одного оператора",
    features: [
      "Shadow vault на устройстве",
      "Терминал с лимитом запросов",
      "Шлюзы XANKONG в режиме draft",
      "Три агента: Coordinator, Engineer, Content",
    ],
    href: "https://buy.stripe.com/bJe5kDgKidlAcro4n49IQ01",
  },
  {
    id: "inferno",
    name: "Inferno",
    priceUsd: 199,
    cadence: "мес",
    tagline: "Команда и расширенные шлюзы",
    features: [
      "Всё из Spark",
      "Research и QA / DevOps",
      "Очередь approvals без лимита",
      "Приоритет в терминале",
    ],
    href: "https://buy.stripe.com/3cI9ATdy6bds9fc1aS9IQ02",
  },
  {
    id: "supernova",
    name: "Supernova",
    priceUsd: 499,
    cadence: "мес",
    tagline: "Полный контур платформы",
    features: [
      "Всё из Inferno",
      "Julio — persistent mentor",
      "Кастомные агенты",
      "Прямой канал с владельцем контура",
    ],
    href: "https://buy.stripe.com/aFa8wP1Po6Xc1MK06O9IQ03",
  },
];

export type GateId =
  | "deploy"
  | "publish"
  | "payment"
  | "wallet_transaction"
  | "advertising_spend"
  | "webhook_registration"
  | "schedule_creation"
  | "connector_activation";

export const GATES: {
  id: GateId;
  name: string;
  summary: string;
  risk: "high" | "critical";
}[] = [
  {
    id: "deploy",
    name: "Deploy",
    summary: "Выкат в сеть. Всегда требует явного approval.",
    risk: "critical",
  },
  {
    id: "publish",
    name: "Publish",
    summary: "Публикация контента во внешние каналы.",
    risk: "high",
  },
  {
    id: "payment",
    name: "Payment",
    summary: "Списание или checkout. Никогда не исполняется из шлюза.",
    risk: "critical",
  },
  {
    id: "wallet_transaction",
    name: "Wallet",
    summary: "Подпись транзакции кошелька. Только черновик.",
    risk: "critical",
  },
  {
    id: "advertising_spend",
    name: "Ads spend",
    summary: "Рекламный расход. Заблокирован по умолчанию.",
    risk: "critical",
  },
  {
    id: "webhook_registration",
    name: "Webhook",
    summary: "Регистрация внешнего webhook endpoint.",
    risk: "high",
  },
  {
    id: "schedule_creation",
    name: "Schedule",
    summary: "Создание внешнего расписания / cron.",
    risk: "high",
  },
  {
    id: "connector_activation",
    name: "Connector",
    summary: "Включение внешнего коннектора.",
    risk: "high",
  },
];

export type AgentId =
  | "Coordinator"
  | "Engineer"
  | "Content"
  | "Research"
  | "QA_DevOps"
  | "Julio";

export const AGENTS: {
  id: AgentId;
  role: string;
  tier: "free" | "pro" | "family";
  status: "online" | "standby";
  blurb: string;
  prompt: string;
}[] = [
  {
    id: "Coordinator",
    role: "координатор",
    tier: "free",
    status: "online",
    blurb: "Распределяет задачи и держит контур целостным.",
    prompt:
      "Ты Coordinator в NEXUS FLAME × XANKONG. Управляешь командой, коротко планируешь, не исполняешь внешние эффекты.",
  },
  {
    id: "Engineer",
    role: "инженер",
    tier: "free",
    status: "online",
    blurb: "Код, инфраструктура, CI — только локальные черновики.",
    prompt:
      "Ты Engineer в NEXUS FLAME. Отвечаешь за код и инфраструктуру. Не деплоишь и не публикуешь без approval.",
  },
  {
    id: "Content",
    role: "контент",
    tier: "free",
    status: "online",
    blurb: "Тексты, документация, тон голоса платформы.",
    prompt:
      "Ты Content-агент NEXUS FLAME. Пишешь ясно, без маркетингового шума и без эмодзи.",
  },
  {
    id: "Research",
    role: "исследование",
    tier: "pro",
    status: "standby",
    blurb: "Сводка, сравнение, разбор источников.",
    prompt:
      "Ты Research в NEXUS FLAME. Анализируешь и структурируешь. Отделяй факты от оценок.",
  },
  {
    id: "QA_DevOps",
    role: "качество",
    tier: "pro",
    status: "standby",
    blurb: "Проверки, мониторинг, стабильность контура.",
    prompt:
      "Ты QA / DevOps в NEXUS FLAME. Ищешь сбои, описываешь риски, не запускаешь внешние хуки.",
  },
  {
    id: "Julio",
    role: "ментор",
    tier: "family",
    status: "online",
    blurb: "Стратег и хранитель решений владельца.",
    prompt:
      "Ты Julio — persistent-ментор NEXUS FLAME. Стратегия, память решений, спокойный тон.",
  },
];

export const MCP_TOOLS = [
  { name: "xankong_status", mode: "read_only" },
  { name: "xankong_capabilities", mode: "read_only" },
  { name: "xankong_create_site_draft", mode: "local_draft" },
  { name: "xankong_create_campaign_draft", mode: "local_draft" },
  { name: "xankong_get_approval_requirements", mode: "read_only" },
  { name: "xankong_request_external_action", mode: "approval_only" },
] as const;

export type LeadTemp = "Холодный" | "Тёплый" | "Горячий";

export const SERVICES: {
  id: string;
  name: string;
  price: string;
  group: string;
}[] = [
  { id: "bot-simple", name: "Простой бот", price: "5 000 ₽", group: "Боты" },
  { id: "bot-db", name: "Бот с базой", price: "15 000 ₽", group: "Боты" },
  { id: "bot-ai", name: "Бот с AI", price: "30 000 ₽", group: "Боты" },
  { id: "landing", name: "Landing", price: "15 000 ₽", group: "Веб" },
  { id: "corp", name: "Корпоративный сайт", price: "40 000 ₽", group: "Веб" },
  { id: "shop", name: "Интернет-магазин", price: "80 000 ₽", group: "Веб" },
  { id: "mobile", name: "Мобильное приложение", price: "от 100 000 ₽", group: "Мобильные" },
  { id: "api", name: "API / Backend", price: "от 20 000 ₽", group: "Backend" },
];

export const CHANNELS: {
  id: string;
  name: string;
  enabled: boolean;
  note: string;
}[] = [
  { id: "web", name: "Web", enabled: true, note: "этот контур" },
  { id: "api", name: "API", enabled: true, note: "терминал / серверные функции" },
  {
    id: "telegram",
    name: "Telegram",
    enabled: false,
    note: "нужен BOT_TOKEN — не запускается из браузера",
  },
  { id: "whatsapp", name: "WhatsApp", enabled: false, note: "выключен" },
  { id: "slack", name: "Slack", enabled: false, note: "выключен" },
  { id: "discord", name: "Discord", enabled: false, note: "выключен" },
];

const HOT = ["order", "consultation", "заказать", "сколько стоит", "сделай", "хочу"];
const WARM = ["цена", "цены", "портфолио", "отзывы", "примеры"];

export function scoreLead(action: string, text: string) {
  const combined = `${action} ${text}`.toLowerCase();
  let temperature: LeadTemp = "Холодный";
  if (HOT.some((k) => combined.includes(k))) temperature = "Горячий";
  else if (WARM.some((k) => combined.includes(k))) temperature = "Тёплый";
  const probability =
    temperature === "Горячий" ? 0.74 : temperature === "Тёплый" ? 0.41 : 0.14;
  return { temperature, probability };
}
