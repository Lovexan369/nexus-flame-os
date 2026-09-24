import { i as GATES, t as AGENTS } from "./catalog-CCmqPdfJ.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-CX4gbHLe.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
	return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
function prune(items, max) {
	return items.slice(0, max);
}
var useFlame = create()(persist((set, get) => ({
	hydrated: false,
	creatorMode: true,
	operator: false,
	messages: [{
		id: "welcome",
		from: "system",
		text: "Shadow vault готов. Сообщения живут только на этом устройстве. Внешние эффекты заблокированы — любой выход в сеть идёт через шлюз XANKONG.",
		at: Date.now()
	}],
	approvals: [],
	activity: [{
		id: "boot",
		kind: "system",
		text: "Контур поднят. XKC_MODE = local_draft_only",
		at: Date.now()
	}],
	thread: [],
	agent: "Coordinator",
	startedAt: Date.now(),
	setHydrated: () => set({ hydrated: true }),
	setCreatorMode: (value) => {
		set({ creatorMode: value });
		get().log("system", value ? "Creator Mode включён — монетизация скрыта" : "Creator Mode выключен — тарифы видны");
	},
	unlockOperator: () => {
		set({ operator: true });
		get().log("system", "Операторский контур открыт");
	},
	lockOperator: () => set({ operator: false }),
	sendMessage: (text, ttlMs) => {
		const trimmed = text.trim();
		if (!trimmed) return;
		const at = Date.now();
		const msg = {
			id: uid(),
			from: "you",
			text: trimmed,
			at,
			expiresAt: ttlMs ? at + ttlMs : void 0
		};
		set((s) => ({ messages: [...s.messages, msg] }));
		get().log("message", "Сообщение в Shadow vault");
	},
	purgeExpired: () => {
		const now = Date.now();
		set((s) => ({ messages: s.messages.filter((m) => !m.expiresAt || m.expiresAt > now) }));
	},
	clearVault: () => {
		set({ messages: [{
			id: uid(),
			from: "system",
			text: "Vault очищен. История на этом устройстве стёрта.",
			at: Date.now()
		}] });
		get().log("system", "Vault очищен");
	},
	requestGate: (gate, reason) => {
		const item = {
			id: uid(),
			gate,
			reason: reason.trim() || "без комментария",
			status: "approval_required",
			executable: false,
			at: Date.now()
		};
		const meta = GATES.find((g) => g.id === gate);
		set((s) => ({ approvals: [item, ...s.approvals] }));
		get().log("gate", `${meta?.name ?? gate} → approval_required, executable: false`);
		return item;
	},
	resolveGate: (id, status) => {
		set((s) => ({ approvals: s.approvals.map((a) => a.id === id ? {
			...a,
			status,
			executable: false
		} : a) }));
		get().log("gate", status === "denied" ? "Запрос отклонён. Ничего не исполнено." : "Локальная отметка. Внешний эффект по-прежнему заблокирован.");
	},
	setAgent: (id) => set({ agent: id }),
	pushTerminal: (turn) => {
		set((s) => ({ thread: [...s.thread, {
			...turn,
			id: uid(),
			at: Date.now()
		}].slice(-40) }));
		if (turn.role === "user") {
			const agent = AGENTS.find((a) => a.id === turn.agent);
			get().log("terminal", `Запрос → ${agent?.id ?? "agent"}`);
		}
	},
	log: (kind, text) => {
		const row = {
			id: uid(),
			kind,
			text,
			at: Date.now()
		};
		set((s) => ({ activity: prune([row, ...s.activity], 48) }));
	}
}), {
	name: "nexus-flame-v1",
	skipHydration: true,
	partialize: (s) => ({
		creatorMode: s.creatorMode,
		operator: s.operator,
		messages: s.messages,
		approvals: s.approvals,
		activity: s.activity,
		thread: s.thread,
		agent: s.agent,
		startedAt: s.startedAt
	})
}));
//#endregion
export { useFlame as n, cn as t };
