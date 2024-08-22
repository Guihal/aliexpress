import { timeSvgIcon } from "../hero/timeSvgIcon";
import { show } from "../utils/show";
import { hide } from "../utils/hide";

export class HeroSlider {
	block;
	posts;
	slider;

	slidesNumber;
	currentSlide;

	imgs;
	slides;
	pags;

	timer;

	pass = true;

	constructor(block, posts) {
		this.block = block;

		this.posts = posts.length > 6 ? posts.splice(4, posts.length - 5) : posts;

		if (posts.length == 0) {
			console.log("Постов нету, епта");
			return;
		}

		this.slidesNumber = posts[posts.length - 1].id;

		this._addHtmlToBlock();

		this.slider = this.block.querySelector(".hero__container");
		this.imgs = this.slider.querySelectorAll(".hero__last-post_img-container");
		this.slides = this.slider.querySelectorAll(".hero__description__slide");
		this.pags = this.slider.querySelectorAll(".hero__pag-item");

		this.descrCon = this.slider.querySelector(".hero__description");

		this._sliderStart();
	}

	_addHtmlToBlock() {
		this.block.innerHTML += this._heroBlock();
	}

	_sliderStart() {
		this._showSlide(1);
		this.currentSlide = 1;

		this._setTimer();
		this._eventPags();
		this._addEventsPosts();
		this._addSwipeEvents();
		console.log(1);
	}

	_eventPags() {
		this.pags.forEach((pag) => {
			pag.addEventListener("click", () => {
				if (!this.pass) return;
				if (this._getSlideActive().number == Number(pag.dataset.slide)) return;

				this.pass = false;

				clearTimeout(this.timer);

				this._showSlide(Number(pag.dataset.slide));
				this._setTimer();

				setTimeout(() => {
					this.pass = true;
				}, 600);
			});
		});
	}

	_nextSlide() {
		if (this.currentSlide == this.slidesNumber) {
			this.currentSlide = 1;
			this._showSlide(1);
		} else {
			this.currentSlide++;
			this._showSlide(this.currentSlide);
		}
	}

	_prevSlide() {
		if (this.currentSlide === 1) {
			this.currentSlide = this.slidesNumber;
			this._showSlide(this.slidesNumber);
		} else {
			this.currentSlide--;
			this._showSlide(this.currentSlide);
		}
	}

	_setTimer() {
		this.timer = setTimeout(() => {
			if (!this.pass) {
				this._setTimer();
				return;
			}

			this.pass = false;
			this._nextSlide();
			this._setTimer();

			setTimeout(() => {
				this.pass = true;
			}, 600);
		}, 5000);
	}

	_getSlide(slideNumber) {
		return {
			img: this.slider.querySelector(`.hero__slide-img[data-slide="${slideNumber}"]`),
			descr: this.slider.querySelector(`.hero__description__slide[data-slide="${slideNumber}"]`),
			pag: this.slider.querySelector(`.hero__pag-item[data-slide="${slideNumber}"]`),
		};
	}

	_getSlideActive() {
		const active = this.slider.querySelector(`.active`);

		if (!active) {
			return {
				number: 0,
				img: [],
				descr: [],
				pag: [],
			};
		}

		return {
			number: Number(active.dataset.slide),
			img: this.slider.querySelectorAll(`.hero__slide-img.active`),
			descr: this.slider.querySelectorAll(`.hero__description__slide.active`),
			pag: this.slider.querySelectorAll(`.hero__pag-item.active`),
		};
	}

	_showSlide(slideNumber) {
		let tr = 350;

		this.currentSlide = slideNumber;

		if (!this._removeActive()) {
			tr = 0;
		}

		setTimeout(() => {
			const slide = this._getSlide(slideNumber);

			if (slide.img) {
				this._showBlock(slide.img);
			}

			if (slide.descr) {
				this._showBlock(slide.descr);
			}

			if (slide.pag) {
				slide.pag.classList.add("active");
			}

			this.descrCon.style.height = "auto";
		}, tr);
	}

	_hideBlock(block) {
		block.classList.remove("active");
		hide(block, 300);
	}

	_showBlock(block) {
		block.classList.add("active");
		show(block, 300, "block");
	}

	_addSwipeEvents() {
		let xStart = 0;
		let xEnd = 0;

		let scY = 0;

		this.block.addEventListener("touchstart", (ev) => {
			// if (!this.pass) return;

			const touchStart = ev.touches;

			// if (touchStart[0].target.classList.contains("hero__pag-item")) return;

			for (let i = 0; i < touchStart.length; i++) {
				xStart += touchStart[i].clientX;
			}

			scY = window.scrollY;
		});

		this.block.addEventListener("touchend", (event) => {
			const touchEnd = event.changedTouches;

			if (touchEnd[0].target.classList.contains("hero__pag-item")) {
				return;
			}

			if (!this.pass) return;

			for (let i = 0; i < touchEnd.length; i++) {
				xEnd += touchEnd[i].clientX;
			}

			if (scY != window.scrollY) {
				return;
			}

			this.pass = false;

			// console.log("xStart " + xStart);
			// console.log("xEnd " + xEnd);

			if (xStart < xEnd) {
				clearTimeout(this.timer);
				this._setTimer();

				this._prevSlide();
				// console.log(1);
			} else {
				clearTimeout(this.timer);
				this._setTimer();

				// console.log(2);
				this._nextSlide();
			}

			setTimeout(() => {
				this.pass = true;
			}, 600);

			xStart = 0;
			xEnd = 0;
		});
	}

	_removeActive() {
		const slide = this._getSlideActive();

		this.descrCon.style.height = this.descrCon.getBoundingClientRect().height + "px";

		let pass = false;

		slide.img.forEach((el) => {
			this._hideBlock(el);

			pass = true;
		});

		slide.descr.forEach((el) => {
			this._hideBlock(el);

			pass = true;
		});

		slide.pag.forEach((el) => {
			el.classList.remove("active");
		});

		return pass;
	}

	_heroBlock() {
		return `
<div class="hero">
	<div class="hero__container">
		<div class="hero__last-post">
            ${this._Imgs()}
		</div>
		<div class="hero__description">
			    ${this._Description()}
			<div class="hero__pag">
                ${this._Pag()}
			</div>
		</div>
	</div>
</div>
        `;
	}

	_Imgs() {
		let imgs = "";

		this.posts.forEach((post) => {
			if (!post.hasOwnProperty("img") && !post.hasOwnProperty("homeImg")) return;

			let src;

			if (post.hasOwnProperty("img")) {
				if (post.hasOwnProperty("homeImg")) {
					src = post.homeImg;
				} else {
					src = post.img;
				}
			} else if (post.hasOwnProperty("homeImg")) {
				src = post.homeImg;
			}

			imgs += `<div data-id="${post.uid}" data-slide="${post.id}" class="hero__last-post_img-container hero__slide-img"> <img " class="hero__last-post_img" alt="Крутое изображение поста" src="${src}" /> </div>`;
		});

		return imgs;
	}

	_Pag() {
		let pag = "";

		this.posts.forEach((post) => {
			pag += `<div class="hero__pag-item" data-slide="${post.id}"></div>`;
		});

		return pag;
	}

	_addEventsPosts() {
		Array.prototype.concat.call(...this.imgs, ...this.slides).forEach((post) => {
			post.addEventListener("click", (ev) => {
				const feedPost = this.block.querySelector(`.js-feed-post[data-post-uid="${post.dataset.id}"]`);
				if (!feedPost) return;

				feedPost.click();

				setTimeout(() => {
					if (!document.querySelector(".t-feed__post-popup")) {
						const feedPosthref = feedPost.querySelector("a");
						if (!feedPosthref) return;

						feedPosthref.click();
					}
				}, 100);

				// console.log("click");
			});
		});
	}

	_Description() {
		let description = ``;

		this.posts.forEach((post) => {
			let descriptionSlide = `<div class="hero__description__slide" data-id="${post.uid}" data-slide="${post.id}">`;

			// console.log(post);

			if (post.hasOwnProperty("tags")) {
				descriptionSlide += `<div class="post_tag">${post.tags}</div>`;
			}
			if (post.hasOwnProperty("title")) {
				descriptionSlide += `<div class="hero__last-post_title">${post.title}</div>`;
			}

			if (post.hasOwnProperty("date") || post.hasOwnProperty("timeReading")) {
				let postInfo = '<div class="post__info">';

				if (post.hasOwnProperty("date")) {
					postInfo += `<div class="post_date">${post.date}</div>`;
				}

				if (post.hasOwnProperty("timeReading")) {
					postInfo += `<div class="post_time-reading">${timeSvgIcon()} ${post.timeReading} минут</div>`;
				}

				postInfo += "</div>";

				descriptionSlide += postInfo;
			}

			descriptionSlide += `</div>`;

			description += descriptionSlide;
		});

		return description;
	}
}
