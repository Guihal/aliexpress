import elementReady from "../utils/elementReady";
import { throttle } from "../utils/throttle";

export async function initRubricator() {
	const rubricatorBlock = await elementReady(".uc-rubricator");
	const rubricatorT = await elementReady(".uc-rubricator .t976");
	const rubricatorWr = await elementReady(".uc-rubricator .t976__wrapper");

	const rubricatorSlides = rubricatorWr.querySelectorAll(".t976__list-item");

	const blurLeft = Object.assign(document.createElement("div"), { className: "t976_blur t976_blur-left" });
	const blurRight = Object.assign(document.createElement("div"), { className: "t976_blur t976_blur-right" });

	const animBlock = Object.assign(document.createElement("div"), { className: "anim-block", innerHTML: '<div class="anim-block-in"></div>' });

	const tCol = rubricatorT.parentNode;

	tCol.prepend(blurLeft);
	tCol.append(blurRight);
	tCol.append(animBlock);

	const updateWidth = () => {
		let widthRubri = (rubricatorSlides.length - 2) * 10;
		for (let i = 0; i < rubricatorSlides.length; i++) {
			widthRubri = widthRubri + rubricatorSlides[i].offsetWidth;
		}
		widthRubri += 10;

		rubricatorWr.style.width = widthRubri + "px";
	};

	updateWidth();

	const obj = {
		viewport: rubricatorT,
		content: rubricatorWr,
		scrollMode: "native",
		pointerMode: "mouse",
		bounce: false,
		onUpdate: (state) => {
			if (state.borderCollision.left) {
				blurLeft.style.opacity = 0;
				blurRight.style.opacity = 1;
			} else if (state.borderCollision.right) {
				blurLeft.style.opacity = 1;
				blurRight.style.opacity = 0;
			} else {
				blurLeft.style.opacity = 1;
				blurRight.style.opacity = 1;
			}
		},
	};

	let booster = new ScrollBooster(obj);

	window.addEventListener("load", () => {
		booster.destroy();
		updateWidth();
		booster = new ScrollBooster(obj);
	});

	rubricatorT.addEventListener("scroll", () => {
		const shiftLeft = rubricatorWr.getBoundingClientRect().left - rubricatorT.getBoundingClientRect().left;
		const shiftRight = rubricatorWr.getBoundingClientRect().right - rubricatorT.getBoundingClientRect().right;

		console.log("shiftRight " + shiftRight);
		console.log("shiftLeft " + shiftLeft);

		if (shiftLeft < 5 && shiftLeft > -5) {
			blurLeft.style.opacity = 0;
			blurRight.style.opacity = 1;
		} else if (shiftRight < 5 && shiftRight > -5) {
			blurLeft.style.opacity = 1;
			blurRight.style.opacity = 0;
		} else {
			blurLeft.style.opacity = 1;
			blurRight.style.opacity = 1;
		}
	});

	// rubricatorWr.addEventListener("pointermove", (event) => {
	// 	console.log(2);
	// 	if (rubricatorWr.getBoundingClientRect().left == rubricatorT.getBoundingClientRect().left) {
	// 		blurLeft.style.opacity = 0;
	// 		blurRight.style.opacity = 1;
	// 	} else if (rubricatorWr.getBoundingClientRect().right == rubricatorT.getBoundingClientRect().right) {
	// 		blurLeft.style.opacity = 1;
	// 		blurRight.style.opacity = 0;
	// 	} else {
	// 		blurLeft.style.opacity = 1;
	// 		blurRight.style.opacity = 1;
	// 	}
	// });

	window.addEventListener(
		"resize",
		throttle(() => {
			booster.destroy();
			updateWidth();
			booster = new ScrollBooster(obj);
		}),
		200
	);
}
