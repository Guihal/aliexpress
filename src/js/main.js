import "../scss/main.scss";
import { initRubricator } from "./Rubricator/initRubricator";
import { heroInit } from "./hero/heroInit";
import { mainObserver } from "./mainObserver";
import { moveToTop } from "./hero-post/moveToTop";
function init() {
	initRubricator();

	mainObserver();
	heroInit();

	moveToTop();
}

init();
