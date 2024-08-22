import getPostsOnLoading from "./getPostsOnLoading";
import { remakeTime } from "./remakeTime";

export async function getInfoPosts(block) {
	return new Promise(async (resolve) => {
		const info = [];
		let postCounter = 1;
		const posts = await getPostsOnLoading(block);

		posts.forEach((post) => {
			const postInfo = {};

			if (post.dataset.postUid == null) return;

			postInfo.id = postCounter;

			const postDesription = post.querySelector(".js-feed-post-descr");
			const postDate = post.querySelector(".js-feed-post-date");
			const postTitle = post.querySelector(".js-feed-post-title");
			const postImg = post.querySelector(".t-feed__post-bgimg");

			postInfo.uid = post.dataset.postUid;

			if (postDate) {
				const date = postDate.textContent;
				if (date.includes(".")) {
					postInfo.date = remakeTime(date);
				} else {
					postInfo.date = date;
				}
			}

			if (postTitle) {
				postInfo.title = postTitle.textContent;
			}

			if (postImg) {
				postInfo.img = postImg.dataset.original;
			}

			if (postDesription) {
				const postDesriptionText = postDesription.textContent;

				if (!postDesriptionText.includes("=====")) {
					postInfo.description = postDesriptionText;
				} else {
					const postDesriptionTextSplit = postDesription.textContent.split("=====");

					postInfo.description = postDesriptionTextSplit[0];

					const postTechInfo = postDesriptionTextSplit[1].replaceAll(/(\r\n|\n|\r|<br>)/gm, "").split("^");

					postTechInfo.forEach((el) => {
						if (el.includes("теги")) {
							postInfo.tags = el.replace("теги", "");
						} else if (el.includes("время")) {
							postInfo.timeReading = el.replace("время", "");
						} else if (el.includes("ссылка")) {
							postInfo.homeImg = el.replace("ссылка", "").replace(" ", "");
						}
					});
				}
			}

			info.push(postInfo);

			postCounter++;
		});

		resolve(info);
		// return info;
	});
}
