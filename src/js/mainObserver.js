import { remakeTime } from "./hero/remakeTime";
import { timeSvgIcon } from "./hero/timeSvgIcon";
import { heroSliderInit } from "./hero-slider/heroSliderInit";
import { heroPost } from "./hero-post/heroPost";
import { removeDescription } from "./removeDescription";
import { autoclickBtn } from "./autoclick";
export function mainObserver() {
	const observer = new MutationObserver((mutations, obs) => {
		heroSliderInit();

		heroPost({ half: true });
		heroPost({ class: "-1" });
		heroPost({
			class: "-2",
			unity: true,
		});

		autoclickBtn();

		removeDescription();

		if (document.querySelector("footer")) obs.disconnect();
	});

	observer.observe(document.documentElement, { childList: true, subtree: true });
}
