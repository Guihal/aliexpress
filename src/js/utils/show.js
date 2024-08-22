export function show(el, tr, dspl) {
	el.style.transition = "all " + tr + "ms";
	el.style.cssText += "display: " + dspl + " !important";
	setTimeout(() => {
		el.style.opacity = 1;
	}, 50);
}
