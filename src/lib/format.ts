export function formatClock(ts: number) {
  return new Date(ts).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatWhen(ts: number) {
  const delta = Date.now() - ts;
  const min = Math.floor(delta / 60000);
  if (min < 1) return "сейчас";
  if (min < 60) return `${min} мин`;
  const hrs = Math.floor(min / 60);
  if (hrs < 24) return `${hrs} ч`;
  return new Date(ts).toLocaleDateString("ru-RU");
}

export function formatUptime(startedAt: number) {
  const sec = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}
