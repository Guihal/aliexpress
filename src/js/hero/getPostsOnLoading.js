import elementReady from "../utils/elementReady";

export default async function getPostsOnLoading(block) {
	return new Promise(async (resolve) => {
		const postsContainer = await elementReady(".js-feed-container", block);

		const observer = new MutationObserver((mutations, obs) => {
			if (postsContainer.dataset.sliderTotalslides == null) return;

			const posts = postsContainer.querySelectorAll(".js-feed-post");

			if (Number(postsContainer.dataset.sliderTotalslides) == posts.length) {
				resolve(posts);
			}
		});

		observer.observe(block, { childList: true, subtree: true });
	});
}
