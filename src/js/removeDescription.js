import { remakeTime } from "./hero/remakeTime";
import { timeSvgIcon } from "./hero/timeSvgIcon";
import { heroSliderInit } from "./hero-slider/heroSliderInit";
import { heroPost } from "./hero-post/heroPost";

export function removeDescription() {
	const observer = new MutationObserver((mutations, obs) => {
		heroSliderInit();
		heroPost();

		document.querySelectorAll(".js-feed-post-text").forEach((el) => {
			if (!el.innerHTML.includes("=====")) return;

			const elSplitHtml = el.innerHTML.split("=====");
			// console.log(elSplitHtml.length);
			if (elSplitHtml.length == 2) {
				el.innerHTML = elSplitHtml[0];
			} else if (elSplitHtml.length == 3) {
				el.innerHTML = elSplitHtml[0] + elSplitHtml[2];
			}
		});

		document.querySelectorAll('[data-record-type="915"]').forEach((el) => {
			if (el.classList.contains("uc-hero") || el.classList.contains("uc-hero-slider")) return;

			el.querySelectorAll(".js-feed-post-descr").forEach((postDescr) => {
				if (!postDescr.innerHTML.includes("=====")) return;

				const elSplitHtml = postDescr.innerHTML.split("=====");
				// console.log(elSplitHtml.length);
				if (elSplitHtml.length == 2) {
					postDescr.innerHTML = elSplitHtml[0];
				} else if (elSplitHtml.length == 3) {
					postDescr.innerHTML = elSplitHtml[0] + elSplitHtml[2];
				}

				const postTechInfo = elSplitHtml[1].replaceAll(/(\r\n|\n|\r|<br>)/gm, "").split("^");

				const textWrapper = postDescr.parentNode;

				let bottomPost = "";

				const postDate = textWrapper.parentNode.querySelector(".js-feed-post-date");

				if (postDate) {
					const date = postDate.textContent;

					if (date.includes(".")) {
						bottomPost += `<div class="post_date">${remakeTime(date)}</div>`;
					} else {
						bottomPost += `<div class="post_date">${date}</div>`;
					}
				}

				postTechInfo.forEach((el) => {
					if (el.includes("теги")) {
						textWrapper.innerHTML = `<div class="post_tag">${el.replace("теги", "")}</div>` + textWrapper.innerHTML;
					} else if (el.includes("время")) {
						bottomPost += `<div class="post_time-reading">${timeSvgIcon()} ${el.replace("время", "")} минут</div>`;
					}
				});

				const date = textWrapper.parentNode.querySelector(".t-feed__post-parts-date-row");

				if (bottomPost != "") {
					date.innerHTML = bottomPost;
				}
			});
		});
	});

	observer.observe(document.documentElement, { childList: true, subtree: true });
}
