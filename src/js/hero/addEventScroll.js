export function addEventScroll(block) {
	const blockWr = block.querySelector(".popular-posts__wrapper");
	const blockScroll = block.querySelector(".popular-posts__inner");

	if (!blockScroll || !blockWr) return;

	const scrollFunc = () => {
		// console.log(blockScroll.scrollHeight);
		// console.log(blockScroll.scrollTop + blockScroll.clientHeight);
		if (blockScroll.scrollHeight <= blockScroll.clientHeight) return;

		if (blockScroll.scrollTop == 0) {
			blockWr.classList.add("bottom-fade");
			blockWr.classList.remove("top-fade");
		} else if (blockScroll.scrollHeight <= blockScroll.scrollTop + blockScroll.clientHeight + 5) {
			blockWr.classList.remove("bottom-fade");
			blockWr.classList.add("top-fade");
		} else {
			blockWr.classList.add("top-fade");
			blockWr.classList.add("bottom-fade");
		}
	};

	scrollFunc();

	blockScroll.addEventListener("scroll", (ev) => {
		scrollFunc();
	});
}
