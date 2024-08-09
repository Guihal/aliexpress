import elementReady from "../utils/elementReady";
import { getInfoPosts } from "./getInfoPosts";
import { addHero } from "./addHero";
import { addEventsPosts } from "./addEventsPosts";
import { addEventScroll } from "./addEventScroll";

export async function heroInit() {
	const block = await elementReady(".uc-hero");

	block.classList.add("hide-posts");

	const infoPosts = await getInfoPosts(block);

	// console.log(infoPosts);

	addHero(infoPosts, block);
	addEventsPosts(block);
	addEventScroll(block);
}
