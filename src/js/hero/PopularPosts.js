import { timeSvgIcon } from "./timeSvgIcon";

export function PopularPosts(data) {
	if (data.length < 2) return "";

	let posts = "";

	for (let i = 1; i < data.length; i++) {
		const postData = data[i];

		const postTag = postData.hasOwnProperty("tags") ? `<div class="post_tag">${postData.tags}</div>` : "";
		const postTitle = postData.hasOwnProperty("title") ? `<div class="post_title">${postData.title}</div>` : "";
		const postDate = postData.hasOwnProperty("date") ? `<div class="post_date">${postData.date}</div>` : "";
		const postTimeReading = postData.hasOwnProperty("timeReading") ? `<div class="post_time-reading">${timeSvgIcon()} ${postData.timeReading} минут </div> ` : "";

		posts += `
        <div class="popular-post" data-id="${postData.uid}">
			${postTag}
            ${postTitle}
			<div class="post__info">
				${postDate}
                ${postTimeReading}
			</div>
		</div>`;
	}

	return posts;
}
