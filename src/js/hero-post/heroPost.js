import { makeMainBlock } from "./makeMainBlock";
import { makeSecondBlock } from "./makeSecondBlock";
import { getPostData } from "./getPostData";
import { moveBlocks } from "./moveBlocks";

export function heroPost(obj = {}) {
	const block = obj.hasOwnProperty("class") ? document.getElementsByClassName("uc-descr" + obj.class) : document.getElementsByClassName("uc-descr");

	for (let i = 0; i < block.length; i++) {
		if (block[i].classList.contains("active")) continue;

		const descr = block[i].querySelector(".t1001__descr");
		const descrT1001 = block[i].querySelector(".t1001");
		const img = block[i].querySelector(".t1001__img");

		if (!descr || !descrT1001 || !img) return;

		img.innerHTML = `<img class="descr-img" src="${img.dataset.original}"/>`;
		img.style.cssText = "background-image: none !important;";

		descr.parentNode.parentNode.style.display = "none";

		const blockInfo = descr.innerHTML.split("<br>").filter((el) => {
			if (el != "") return el;
		});

		const data = getPostData(blockInfo);

		// console.log(data);

		const main = makeMainBlock(data);
		const second = makeSecondBlock(data);

		if (obj.hasOwnProperty("unity") && obj.unity) {
			const unityBlock = Object.assign(document.createElement("div"), { className: "unity" });

			unityBlock.prepend(main);
			unityBlock.append(second);

			descrT1001.append(unityBlock);

			descrT1001.classList.add("custom-container");
		} else {
			descrT1001.prepend(main);
			descrT1001.append(second);
		}

		if (obj.hasOwnProperty("half") && obj.half) {
			moveBlocks(block[i]);
		}

		block[i].classList.add("active");
	}
}
