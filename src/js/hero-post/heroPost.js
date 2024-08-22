import elementReady from "../utils/elementReady";
import { makeMainBlock } from "./makeMainBlock";
import { makeSecondBlock } from "./makeSecondBlock";
import { getPostData } from "./getPostData";

export async function heroPost() {
	document.querySelectorAll(".uc-descr:not(.active)").forEach((descrBlock) => {
		const descr = descrBlock.querySelector(".t1001__descr");
		const descrT1001 = descrBlock.querySelector(".t1001");

		if (!descr || !descrT1001) return;

		descrBlock.classList.add("active");

		descr.style.display = "none";

		const blockInfo = descr.innerHTML.split("<br>").filter((el) => {
			if (el != "") return el;
		});

		const data = getPostData(blockInfo);

		console.log(data);

		const main = makeMainBlock(data);
		const second = makeSecondBlock(data);

		descrT1001.prepend(main);
		descrT1001.append(second);
	});
}
