export function PopularPosts(data) {
	if (data.length < 2) return "";

	let posts = "";

	for (let i = 1; i < data.length; i++) {
		const postData = data[i];

		const postTag = postData.hasOwnProperty("tags") ? `<div class="post_tag">${postData.tags}</div>` : "";
		const postTitle = postData.hasOwnProperty("title") ? `<div class="post_title">${postData.title}</div>` : "";
		const postDate = postData.hasOwnProperty("date") ? `<div class="post_date">${postData.date}</div>` : "";
		const postTimeReading = postData.hasOwnProperty("timeReading")
			? `
        <div class="post_time-reading">
					<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
						d="M8 2C6.71442 2 5.45772 2.38122 4.3888 3.09545C3.31988 3.80968 2.48676 4.82484 1.99479 6.01256C1.50282 7.20028 1.37409 8.50721 1.6249 9.76809C1.8757 11.029 2.49477 12.1872 3.40381 13.0962C4.31285 14.0052 5.47104 14.6243 6.73192 14.8751C7.99279 15.1259 9.29973 14.9972 10.4874 14.5052C11.6752 14.0132 12.6903 13.1801 13.4046 12.1112C14.1188 11.0423 14.5 9.78558 14.5 8.5C14.4982 6.77665 13.8128 5.12441 12.5942 3.90582C11.3756 2.68722 9.72335 2.00182 8 2ZM8 14C6.91221 14 5.84884 13.6774 4.94437 13.0731C4.0399 12.4687 3.33495 11.6098 2.91867 10.6048C2.50238 9.59977 2.39347 8.4939 2.60568 7.427C2.8179 6.36011 3.34173 5.3801 4.11092 4.61091C4.8801 3.84172 5.86011 3.3179 6.92701 3.10568C7.9939 2.89346 9.09977 3.00238 10.1048 3.41866C11.1098 3.83494 11.9687 4.53989 12.5731 5.44436C13.1774 6.34883 13.5 7.4122 13.5 8.5C13.4983 9.95818 12.9184 11.3562 11.8873 12.3873C10.8562 13.4184 9.45819 13.9983 8 14ZM12 8.5C12 8.63261 11.9473 8.75979 11.8536 8.85355C11.7598 8.94732 11.6326 9 11.5 9H8C7.86739 9 7.74022 8.94732 7.64645 8.85355C7.55268 8.75979 7.5 8.63261 7.5 8.5V5C7.5 4.86739 7.55268 4.74021 7.64645 4.64645C7.74022 4.55268 7.86739 4.5 8 4.5C8.13261 4.5 8.25979 4.55268 8.35356 4.64645C8.44732 4.74021 8.5 4.86739 8.5 5V8H11.5C11.6326 8 11.7598 8.05268 11.8536 8.14645C11.9473 8.24021 12 8.36739 12 8.5Z"
						fill="#18181B"
						/>
					</svg>
                    ${postData.timeReading} минут
                    </div>
                    `
			: "";

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
