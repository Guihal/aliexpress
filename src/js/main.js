import "../scss/main.scss";
import { initRubricator } from "./Rubricator/initRubricator";
import { heroInit } from "./hero/heroInit";
import { removeDescription } from "./removeDescription";
import { heroPost } from "./hero-post/heroPost";

function init() {
	initRubricator();
	heroInit();
	removeDescription();
	heroPost();
}

init();
