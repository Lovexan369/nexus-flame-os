//#region node_modules/.nitro/vite/services/ssr/assets/catalog-CCmqPdfJ.js
var APP_NAME = "NEXUS FLAME";
var APP_EDITION = "XANKONG · Creator Edition";
var PLANS = [
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
			"Три агента: Coordinator, Engineer, Content"
		],
		href: "https://buy.stripe.com/bJe5kDgKidlAcro4n49IQ01"
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
			"Приоритет в терминале"
		],
		href: "https://buy.stripe.com/3cI9ATdy6bds9fc1aS9IQ02"
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
			"Прямой канал с владельцем контура"
		],
		href: "https://buy.stripe.com/aFa8wP1Po6Xc1MK06O9IQ03"
	}
];
var GATES = [
	{
		id: "deploy",
		name: "Deploy",
		summary: "Выкат в сеть. Всегда требует явного approval.",
		risk: "critical"
	},
	{
		id: "publish",
		name: "Publish",
		summary: "Публикация контента во внешние каналы.",
		risk: "high"
	},
	{
		id: "payment",
		name: "Payment",
		summary: "Списание или checkout. Никогда не исполняется из шлюза.",
		risk: "critical"
	},
	{
		id: "wallet_transaction",
		name: "Wallet",
		summary: "Подпись транзакции кошелька. Только черновик.",
		risk: "critical"
	},
	{
		id: "advertising_spend",
		name: "Ads spend",
		summary: "Рекламный расход. Заблокирован по умолчанию.",
		risk: "critical"
	},
	{
		id: "webhook_registration",
		name: "Webhook",
		summary: "Регистрация внешнего webhook endpoint.",
		risk: "high"
	},
	{
		id: "schedule_creation",
		name: "Schedule",
		summary: "Создание внешнего расписания / cron.",
		risk: "high"
	},
	{
		id: "connector_activation",
		name: "Connector",
		summary: "Включение внешнего коннектора.",
		risk: "high"
	}
];
var AGENTS = [
	{
		id: "Coordinator",
		role: "координатор",
		tier: "free",
		status: "online",
		blurb: "Распределяет задачи и держит контур целостным.",
		prompt: "Ты Coordinator в NEXUS FLAME × XANKONG. Управляешь командой, коротко планируешь, не исполняешь внешние эффекты."
	},
	{
		id: "Engineer",
		role: "инженер",
		tier: "free",
		status: "online",
		blurb: "Код, инфраструктура, CI — только локальные черновики.",
		prompt: "Ты Engineer в NEXUS FLAME. Отвечаешь за код и инфраструктуру. Не деплоишь и не публикуешь без approval."
	},
	{
		id: "Content",
		role: "контент",
		tier: "free",
		status: "online",
		blurb: "Тексты, документация, тон голоса платформы.",
		prompt: "Ты Content-агент NEXUS FLAME. Пишешь ясно, без маркетингового шума и без эмодзи."
	},
	{
		id: "Research",
		role: "исследование",
		tier: "pro",
		status: "standby",
		blurb: "Сводка, сравнение, разбор источников.",
		prompt: "Ты Research в NEXUS FLAME. Анализируешь и структурируешь. Отделяй факты от оценок."
	},
	{
		id: "QA_DevOps",
		role: "качество",
		tier: "pro",
		status: "standby",
		blurb: "Проверки, мониторинг, стабильность контура.",
		prompt: "Ты QA / DevOps в NEXUS FLAME. Ищешь сбои, описываешь риски, не запускаешь внешние хуки."
	},
	{
		id: "Julio",
		role: "ментор",
		tier: "family",
		status: "online",
		blurb: "Стратег и хранитель решений владельца.",
		prompt: "Ты Julio — persistent-ментор NEXUS FLAME. Стратегия, память решений, спокойный тон."
	}
];
var MCP_TOOLS = [
	{
		name: "xankong_status",
		mode: "read_only"
	},
	{
		name: "xankong_capabilities",
		mode: "read_only"
	},
	{
		name: "xankong_create_site_draft",
		mode: "local_draft"
	},
	{
		name: "xankong_create_campaign_draft",
		mode: "local_draft"
	},
	{
		name: "xankong_get_approval_requirements",
		mode: "read_only"
	},
	{
		name: "xankong_request_external_action",
		mode: "approval_only"
	}
];
//#endregion
export { MCP_TOOLS as a, GATES as i, APP_EDITION as n, PLANS as o, APP_NAME as r, AGENTS as t };
