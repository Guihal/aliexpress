export function addEventsPosts(block) {
	block.querySelectorAll(".hero__last-post, .popular-post").forEach((post) => {
		post.addEventListener("click", (ev) => {
			const feedPost = block.querySelector(`.js-feed-post[data-post-uid="${post.dataset.id}"]`);
			if (!feedPost) return;

			feedPost.click();

			setTimeout(() => {
				if (!document.querySelector(".t-feed__post-popup")) {
					const feedPosthref = feedPost.querySelector("a");
					if (!feedPosthref) return;

					feedPosthref.click();
				}
			}, 100);

			console.log("click");
		});
	});
}

// function hideBlock(){
// 	const post = document.querySelector('.t-feed__post-popup');

// 	if(!)
// }
