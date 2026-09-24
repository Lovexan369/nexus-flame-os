import { t as cn } from "./store-CX4gbHLe.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-Dn30A1_q.js
var import_jsx_runtime = require_jsx_runtime();
var tones = {
	neutral: "text-muted bg-elevated",
	accent: "text-accent bg-accent/12",
	ok: "text-ok bg-ok/12",
	warn: "text-warn bg-warn/12",
	danger: "text-danger bg-danger/12"
};
function Badge({ className, tone = "neutral", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium tracking-wide", tones[tone], className),
		...props
	});
}
//#endregion
export { Badge as t };
