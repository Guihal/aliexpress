import elementReady from "../utils/elementReady";

export default function getPostsOnLoading(block) {
	return new Promise(async (resolve) => {
		const postsContainer = await elementReady(".js-feed-container", block);

		const observer = new MutationObserver((mutations, obs) => {
			if (postsContainer.dataset.feedShowCount == null) return;

			const posts = postsContainer.querySelectorAll(".js-feed-post");

			if (Number(postsContainer.dataset.feedShowCount) == posts.length || Number(postsContainer.dataset.sliderTotalslides) == posts.length) {
				resolve(posts);
				obs.disconnect();
			}
		});

		observer.observe(block, { childList: true, subtree: true });
	});
}
