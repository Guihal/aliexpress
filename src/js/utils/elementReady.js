export default async function elementReady(selector, parent = false) {
	return new Promise((resolve) => {
		const observer = new MutationObserver((mutations, obs) => {
			const block = parent ? parent.querySelector(selector) : document.querySelector(selector);

			if (block) {
				resolve(block); // Промис выполнен, элемент найден
				obs.disconnect();
			}
		});

		parent ? observer.observe(parent, { childList: true, subtree: true }) : observer.observe(document.documentElement, { childList: true, subtree: true });
	});
}
