import { timeSvgIcon } from "../hero/timeSvgIcon";

export function makeMainBlock(data) {
	const block = Object.assign(document.createElement("div"), { className: "t-container t1001__container_column" });

	let postInfo = `<div class="post__info">`;

	if (data.hasOwnProperty("date")) {
		postInfo += `<div class="post_date">${data.date}</div>`;
	}

	if (data.hasOwnProperty("time")) {
		postInfo += `<div class="post_time-reading">${timeSvgIcon()} ${data.time}</div>`;
	}

	postInfo += "</div>";

	block.innerHTML += postInfo;

	if (data.hasOwnProperty("title")) {
		block.innerHTML += `<div class="hero__last-post_title">${data.title}</div>`;
	}

	return block;
}
