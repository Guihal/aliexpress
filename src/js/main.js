import "../scss/main.scss";
import { initRubricator } from "./Rubricator/initRubricator";
import { heroInit } from "./hero/heroInit";
import { removeDescription } from "./removeDescription";

function init() {
	initRubricator();
	heroInit();
	removeDescription();
}

init();
