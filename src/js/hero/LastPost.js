import { timeSvgIcon } from "./timeSvgIcon";

export function LastPost(data) {
	if (data.length == 0) return "";

	const postData = data[0];

	const postImg = postData.hasOwnProperty("img") ? `<div class="hero__last-post_img-container"> <img class="hero__last-post_img" loading="lazy" alt="Крутое изображение поста" src="${postData.hasOwnProperty("homeImg") ? postData.homeImg : postData.img}" /></div>` : "";
	// const postTag = postData.hasOwnProperty("tag") ? `<div class="post_tag">${postData.tag}</div>` : "";
	const postTitle = postData.hasOwnProperty("title") ? `<div class="hero__last-post_title">${postData.title}</div>` : "";
	const postDate = postData.hasOwnProperty("date") ? `<div class="post_date">${postData.date}</div>` : "";
	const postTimeReading = postData.hasOwnProperty("timeReading") ? `<div class="post_time-reading">${timeSvgIcon()} ${postData.timeReading} минут</div>` : "";

	return `
    <div class="hero__last-post" data-id="${postData.uid}">
			${postImg}
            ${postTitle}
			<div class="post__info">
                ${postDate}
                ${postTimeReading}
			</div>
	</div>`;
}
