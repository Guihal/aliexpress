export default async function elementReady(selector, parent = false) {
	return new Promise((resolve) => {
		const observer = new MutationObserver((mutations, obs) => {
			if (parent) {
				const block = parent.querySelector(selector);

				if (block) {
					resolve(block); // Промис выполнен, элемент найден
					obs.disconnect();
				}
			} else {
				const block = document.querySelector(selector);

				if (block) {
					resolve(block); // Промис выполнен, элемент найден
					obs.disconnect();
				}
			}
		});

		if (parent) {
			observer.observe(parent, { childList: true, subtree: true });
		} else {
			observer.observe(document.documentElement, { childList: true, subtree: true });
		}
	});
}
