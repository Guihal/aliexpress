export function hide(el, tr) {
	el.style.transition = "all " + tr + "ms";
	el.style.opacity = 0;
	setTimeout(() => {
		el.style.cssText += "display: none !important";
	}, tr);
}
