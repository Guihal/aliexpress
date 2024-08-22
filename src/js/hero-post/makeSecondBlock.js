export function makeSecondBlock(data) {
	const block = Object.assign(document.createElement("div"), { className: "t-container t1001__container_column" });

	let row = `<div class="descr-row">`;

	if (data.hasOwnProperty("href")) {
		row += `<div class="descr-link">${data.href}</div>`;
	}

	if (data.hasOwnProperty("tags")) {
		row += data.tags;
	}

	row += `</div>`;

	block.innerHTML += row;

	if (data.hasOwnProperty("descr")) {
		block.innerHTML += `<div class="description">${data.descr}</div>`;
	}

	return block;
}
