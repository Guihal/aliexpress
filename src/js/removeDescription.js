export function removeDescription() {
	const observer = new MutationObserver((mutations, obs) => {
		document.querySelectorAll('.js-feed-post-text, [data-record-type="915"]:not(.uc-hero) .js-feed-post-descr').forEach((el) => {
			if (!el.innerHTML.includes("=====")) return;

			const elSplitHtml = el.innerHTML.split("=====");
			// console.log(elSplitHtml.length);
			if (elSplitHtml.length == 2) {
				el.innerHTML = elSplitHtml[0];
			} else if (elSplitHtml.length == 3) {
				el.innerHTML = elSplitHtml[0] + elSplitHtml[2];
			}
		});
	});

	observer.observe(document.documentElement, { childList: true, subtree: true });
}
