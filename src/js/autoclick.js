import elementReady from "./utils/elementReady";

export function autoclickBtn() {
	const red = document.querySelectorAll(".uc-red_potoki");

	red.forEach(async (el) => {
		if (el.classList.contains("check")) return;

		el.classList.add("check");

		const btn = await elementReady(".js-feed-btn-show-more", el);

		const callback = (entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.click();
				}
			});
		};

		const options = {
			// root: по умолчанию window,
			// но можно задать любой элемент-контейнер
			rootMargin: "0px 0px 20px 0px",
			threshold: 0,
		};

		const observer = new IntersectionObserver(callback, options);

		observer.observe(btn);
	});
}
