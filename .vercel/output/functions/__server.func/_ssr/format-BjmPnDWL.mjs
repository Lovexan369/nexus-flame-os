//#region node_modules/.nitro/vite/services/ssr/assets/format-BjmPnDWL.js
function formatClock(ts) {
	return new Date(ts).toLocaleTimeString("ru-RU", {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function formatWhen(ts) {
	const delta = Date.now() - ts;
	const min = Math.floor(delta / 6e4);
	if (min < 1) return "сейчас";
	if (min < 60) return `${min} мин`;
	const hrs = Math.floor(min / 60);
	if (hrs < 24) return `${hrs} ч`;
	return new Date(ts).toLocaleDateString("ru-RU");
}
function formatUptime(startedAt) {
	const sec = Math.max(0, Math.floor((Date.now() - startedAt) / 1e3));
	const h = Math.floor(sec / 3600);
	const m = Math.floor(sec % 3600 / 60);
	const s = sec % 60;
	const pad = (n) => n.toString().padStart(2, "0");
	return `${pad(h)}:${pad(m)}:${pad(s)}`;
}
//#endregion
export { formatUptime as n, formatWhen as r, formatClock as t };
