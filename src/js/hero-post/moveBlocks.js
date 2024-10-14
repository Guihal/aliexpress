import elementReady from "../utils/elementReady";

export async function moveBlocks(block) {
	const content = await elementReady(".uc-content");
	const contentIn = content.querySelector(".t220");
	const blockIn = block.querySelector(".t1001");

	if (!contentIn || !blockIn) return;

	content.style.display = "none";

	const container = Object.assign(document.createElement("div"), { className: "custom-container" });

	container.prepend(blockIn);
	container.append(contentIn);

	content.remove();

	block.append(container);
}
