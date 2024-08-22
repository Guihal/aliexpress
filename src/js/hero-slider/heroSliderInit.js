import elementReady from "../utils/elementReady";
import { getInfoPosts } from "../hero/getInfoPosts";
import { HeroSlider } from "./HeroSlider";

export function heroSliderInit() {
	document.querySelectorAll(".uc-hero-slider").forEach(async (el) => {
		if (el.classList.contains("hide-posts")) return;

		el.classList.add("hide-posts");

		const infoPosts = await getInfoPosts(el);

		const slider = new HeroSlider(el, infoPosts);
	});

	// addHero(infoPosts, block);
	// addEventsPosts(block);
	// addEventScroll(block);
}
