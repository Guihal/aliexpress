export function getPostData(blockInfo) {
	const data = {};

	blockInfo.forEach((info) => {
		if (info.toLowerCase().includes("дата")) {
			data.date = info.replace("дата", "");
		} else if (info.toLowerCase().includes("тайтл")) {
			data.title = info.replace("тайтл", "");
		} else if (info.toLowerCase().includes("ссылка")) {
			data.href = info.replace("ссылка", "");
		} else if (info.toLowerCase().includes("теги")) {
			data.tags = info.replace("теги", "");
		} else if (info.toLowerCase().includes("чтение")) {
			data.time = info.replace("чтение", "");
		} else if (info.toLowerCase().includes("описание")) {
			data.descr = info.replace("описание", "");
		}
	});

	return data;
}
