!function(){"use strict";async function e(e,t=!1){return new Promise((s=>{const i=new MutationObserver(((i,r)=>{if(t){const i=t.querySelector(e);i&&(s(i),r.disconnect())}else{const t=document.querySelector(e);t&&(s(t),r.disconnect())}}));t?i.observe(t,{childList:!0,subtree:!0}):i.observe(document.documentElement,{childList:!0,subtree:!0})}))}function t(e){const t=e.split(".");let s="месяц";switch(Number(t[1])){case 1:s="января";break;case 2:s="февраля";break;case 3:s="марта";break;case 4:s="апреля";break;case 5:s="мая";break;case 6:s="июня";break;case 7:s="июля";break;case 8:s="августа";break;case 9:s="сентября";break;case 10:s="октября";break;case 11:s="ноября";break;case 12:s="декабря"}return`${t[0]} ${s} ${t[2]}`}async function s(s){return new Promise((async i=>{const r=[];let o=1;const n=await function(t){return new Promise((async s=>{const i=await e(".js-feed-container",t);new MutationObserver(((e,t)=>{if(null==i.dataset.feedShowCount)return;const r=i.querySelectorAll(".js-feed-post");Number(i.dataset.feedShowCount)!=r.length&&Number(i.dataset.sliderTotalslides)!=r.length||(s(r),t.disconnect())})).observe(t,{childList:!0,subtree:!0})}))}(s);n.forEach((e=>{const s={};if(null==e.dataset.postUid)return;s.id=o;const i=e.querySelector(".js-feed-post-descr"),n=e.querySelector(".js-feed-post-date"),l=e.querySelector(".js-feed-post-title"),a=e.querySelector(".t-feed__post-bgimg");if(s.uid=e.dataset.postUid,n){const e=n.textContent;e.includes(".")?s.date=t(e):s.date=e}if(l&&(s.title=l.textContent),a&&(s.img=a.dataset.original),i){const e=i.textContent;if(e.includes("=====")){const e=i.textContent.split("=====");s.description=e[0],e[1].replaceAll(/(\r\n|\n|\r|<br>)/gm,"").split("^").forEach((e=>{e.includes("теги")?s.tags=e.replace("теги",""):e.includes("время")?s.timeReading=e.replace("время",""):e.includes("ссылка")&&(s.homeImg=e.replace("ссылка","").replace(" ",""))}))}else s.description=e}r.push(s),o++})),i(r)}))}class i{block;posts;slider;slidesNumber;currentSlide;imgs;slides;pags;timer;pass=!0;constructor(e,t){this.block=e,this.posts=t.length>6?t.splice(4,t.length-5):t,0!=t.length?(this.slidesNumber=t[t.length-1].id,this._addHtmlToBlock(),this.slider=this.block.querySelector(".hero__container"),this.imgs=this.slider.querySelectorAll(".hero__last-post_img-container"),this.slides=this.slider.querySelectorAll(".hero__description__slide"),this.pags=this.slider.querySelectorAll(".hero__pag-item"),this.descrCon=this.slider.querySelector(".hero__description"),this._sliderStart()):console.log("Постов нету, епта")}_addHtmlToBlock(){this.block.innerHTML+=this._heroBlock()}_sliderStart(){this._showSlide(1),this.currentSlide=1,this._setTimer(),this._eventPags(),this._addEventsPosts(),this._addSwipeEvents(),console.log(1)}_eventPags(){this.pags.forEach((e=>{e.addEventListener("click",(()=>{this.pass&&this._getSlideActive().number!=Number(e.dataset.slide)&&(this.pass=!1,clearTimeout(this.timer),this._showSlide(Number(e.dataset.slide)),this._setTimer(),setTimeout((()=>{this.pass=!0}),600))}))}))}_nextSlide(){this.currentSlide==this.slidesNumber?(this.currentSlide=1,this._showSlide(1)):(this.currentSlide++,this._showSlide(this.currentSlide))}_prevSlide(){1===this.currentSlide?(this.currentSlide=this.slidesNumber,this._showSlide(this.slidesNumber)):(this.currentSlide--,this._showSlide(this.currentSlide))}_setTimer(){this.timer=setTimeout((()=>{this.pass?(this.pass=!1,this._nextSlide(),this._setTimer(),setTimeout((()=>{this.pass=!0}),600)):this._setTimer()}),5e3)}_getSlide(e){return{img:this.slider.querySelector(`.hero__slide-img[data-slide="${e}"]`),descr:this.slider.querySelector(`.hero__description__slide[data-slide="${e}"]`),pag:this.slider.querySelector(`.hero__pag-item[data-slide="${e}"]`)}}_getSlideActive(){const e=this.slider.querySelector(".active");return e?{number:Number(e.dataset.slide),img:this.slider.querySelectorAll(".hero__slide-img.active"),descr:this.slider.querySelectorAll(".hero__description__slide.active"),pag:this.slider.querySelectorAll(".hero__pag-item.active")}:{number:0,img:[],descr:[],pag:[]}}_showSlide(e){let t=350;this.currentSlide=e,this._removeActive()||(t=0),setTimeout((()=>{const t=this._getSlide(e);t.img&&this._showBlock(t.img),t.descr&&this._showBlock(t.descr),t.pag&&t.pag.classList.add("active"),this.descrCon.style.height="auto"}),t)}_hideBlock(e){var t;e.classList.remove("active"),(t=e).style.transition="all 300ms",t.style.opacity=0,setTimeout((()=>{t.style.cssText+="display: none !important"}),300)}_showBlock(e){var t;e.classList.add("active"),(t=e).style.transition="all 300ms",t.style.cssText+="display: block !important",setTimeout((()=>{t.style.opacity=1}),50)}_addSwipeEvents(){let e=0,t=0,s=0;this.block.addEventListener("touchstart",(t=>{const i=t.touches;for(let t=0;t<i.length;t++)e+=i[t].clientX;s=window.scrollY})),this.block.addEventListener("touchend",(i=>{const r=i.changedTouches;if(!r[0].target.classList.contains("hero__pag-item")&&this.pass){for(let e=0;e<r.length;e++)t+=r[e].clientX;s==window.scrollY&&(this.pass=!1,e<t?(clearTimeout(this.timer),this._setTimer(),this._prevSlide()):(clearTimeout(this.timer),this._setTimer(),this._nextSlide()),setTimeout((()=>{this.pass=!0}),600),e=0,t=0)}}))}_removeActive(){const e=this._getSlideActive();this.descrCon.style.height=this.descrCon.getBoundingClientRect().height+"px";let t=!1;return e.img.forEach((e=>{this._hideBlock(e),t=!0})),e.descr.forEach((e=>{this._hideBlock(e),t=!0})),e.pag.forEach((e=>{e.classList.remove("active")})),t}_heroBlock(){return`\n<div class="hero">\n\t<div class="hero__container">\n\t\t<div class="hero__last-post">\n            ${this._Imgs()}\n\t\t</div>\n\t\t<div class="hero__description">\n\t\t\t    ${this._Description()}\n\t\t\t<div class="hero__pag">\n                ${this._Pag()}\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n        `}_Imgs(){let e="";return this.posts.forEach((t=>{if(!t.hasOwnProperty("img")&&!t.hasOwnProperty("homeImg"))return;let s;t.hasOwnProperty("img")?s=t.hasOwnProperty("homeImg")?t.homeImg:t.img:t.hasOwnProperty("homeImg")&&(s=t.homeImg),e+=`<div data-id="${t.uid}" data-slide="${t.id}" class="hero__last-post_img-container hero__slide-img"> <img " class="hero__last-post_img" alt="Крутое изображение поста" src="${s}" /> </div>`})),e}_Pag(){let e="";return this.posts.forEach((t=>{e+=`<div class="hero__pag-item" data-slide="${t.id}"></div>`})),e}_addEventsPosts(){Array.prototype.concat.call(...this.imgs,...this.slides).forEach((e=>{e.addEventListener("click",(t=>{const s=this.block.querySelector(`.js-feed-post[data-post-uid="${e.dataset.id}"]`);s&&(s.click(),setTimeout((()=>{if(!document.querySelector(".t-feed__post-popup")){const e=s.querySelector("a");if(!e)return;e.click()}}),100))}))}))}_Description(){let e="";return this.posts.forEach((t=>{let s=`<div class="hero__description__slide" data-id="${t.uid}" data-slide="${t.id}">`;if(t.hasOwnProperty("tags")&&(s+=`<div class="post_tag">${t.tags}</div>`),t.hasOwnProperty("title")&&(s+=`<div class="hero__last-post_title">${t.title}</div>`),t.hasOwnProperty("date")||t.hasOwnProperty("timeReading")){let e='<div class="post__info">';t.hasOwnProperty("date")&&(e+=`<div class="post_date">${t.date}</div>`),t.hasOwnProperty("timeReading")&&(e+=`<div class="post_time-reading"><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path\td="M8 2C6.71442 2 5.45772 2.38122 4.3888 3.09545C3.31988 3.80968 2.48676 4.82484 1.99479 6.01256C1.50282 7.20028 1.37409 8.50721 1.6249 9.76809C1.8757 11.029 2.49477 12.1872 3.40381 13.0962C4.31285 14.0052 5.47104 14.6243 6.73192 14.8751C7.99279 15.1259 9.29973 14.9972 10.4874 14.5052C11.6752 14.0132 12.6903 13.1801 13.4046 12.1112C14.1188 11.0423 14.5 9.78558 14.5 8.5C14.4982 6.77665 13.8128 5.12441 12.5942 3.90582C11.3756 2.68722 9.72335 2.00182 8 2ZM8 14C6.91221 14 5.84884 13.6774 4.94437 13.0731C4.0399 12.4687 3.33495 11.6098 2.91867 10.6048C2.50238 9.59977 2.39347 8.4939 2.60568 7.427C2.8179 6.36011 3.34173 5.3801 4.11092 4.61091C4.8801 3.84172 5.86011 3.3179 6.92701 3.10568C7.9939 2.89346 9.09977 3.00238 10.1048 3.41866C11.1098 3.83494 11.9687 4.53989 12.5731 5.44436C13.1774 6.34883 13.5 7.4122 13.5 8.5C13.4983 9.95818 12.9184 11.3562 11.8873 12.3873C10.8562 13.4184 9.45819 13.9983 8 14ZM12 8.5C12 8.63261 11.9473 8.75979 11.8536 8.85355C11.7598 8.94732 11.6326 9 11.5 9H8C7.86739 9 7.74022 8.94732 7.64645 8.85355C7.55268 8.75979 7.5 8.63261 7.5 8.5V5C7.5 4.86739 7.55268 4.74021 7.64645 4.64645C7.74022 4.55268 7.86739 4.5 8 4.5C8.13261 4.5 8.25979 4.55268 8.35356 4.64645C8.44732 4.74021 8.5 4.86739 8.5 5V8H11.5C11.6326 8 11.7598 8.05268 11.8536 8.14645C11.9473 8.24021 12 8.36739 12 8.5Z" fill="#18181B" /> </svg> ${t.timeReading} минут</div>`),e+="</div>",s+=e}s+="</div>",e+=s})),e}}async function r(){document.querySelectorAll(".uc-descr:not(.active)").forEach((e=>{const t=e.querySelector(".t1001__descr"),s=e.querySelector(".t1001");if(!t||!s)return;e.classList.add("active"),t.style.display="none";const i=function(e){const t={};return e.forEach((e=>{e.toLowerCase().includes("дата")?t.date=e.replace("дата",""):e.toLowerCase().includes("тайтл")?t.title=e.replace("тайтл",""):e.toLowerCase().includes("ссылка")?t.href=e.replace("ссылка",""):e.toLowerCase().includes("теги")?t.tags=e.replace("теги",""):e.toLowerCase().includes("чтение")?t.time=e.replace("чтение",""):e.toLowerCase().includes("описание")&&(t.descr=e.replace("описание",""))})),t}(t.innerHTML.split("<br>").filter((e=>{if(""!=e)return e})));console.log(i);const r=function(e){const t=Object.assign(document.createElement("div"),{className:"t-container t1001__container_column"});let s='<div class="post__info">';return e.hasOwnProperty("date")&&(s+=`<div class="post_date">${e.date}</div>`),e.hasOwnProperty("time")&&(s+=`<div class="post_time-reading"><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path\td="M8 2C6.71442 2 5.45772 2.38122 4.3888 3.09545C3.31988 3.80968 2.48676 4.82484 1.99479 6.01256C1.50282 7.20028 1.37409 8.50721 1.6249 9.76809C1.8757 11.029 2.49477 12.1872 3.40381 13.0962C4.31285 14.0052 5.47104 14.6243 6.73192 14.8751C7.99279 15.1259 9.29973 14.9972 10.4874 14.5052C11.6752 14.0132 12.6903 13.1801 13.4046 12.1112C14.1188 11.0423 14.5 9.78558 14.5 8.5C14.4982 6.77665 13.8128 5.12441 12.5942 3.90582C11.3756 2.68722 9.72335 2.00182 8 2ZM8 14C6.91221 14 5.84884 13.6774 4.94437 13.0731C4.0399 12.4687 3.33495 11.6098 2.91867 10.6048C2.50238 9.59977 2.39347 8.4939 2.60568 7.427C2.8179 6.36011 3.34173 5.3801 4.11092 4.61091C4.8801 3.84172 5.86011 3.3179 6.92701 3.10568C7.9939 2.89346 9.09977 3.00238 10.1048 3.41866C11.1098 3.83494 11.9687 4.53989 12.5731 5.44436C13.1774 6.34883 13.5 7.4122 13.5 8.5C13.4983 9.95818 12.9184 11.3562 11.8873 12.3873C10.8562 13.4184 9.45819 13.9983 8 14ZM12 8.5C12 8.63261 11.9473 8.75979 11.8536 8.85355C11.7598 8.94732 11.6326 9 11.5 9H8C7.86739 9 7.74022 8.94732 7.64645 8.85355C7.55268 8.75979 7.5 8.63261 7.5 8.5V5C7.5 4.86739 7.55268 4.74021 7.64645 4.64645C7.74022 4.55268 7.86739 4.5 8 4.5C8.13261 4.5 8.25979 4.55268 8.35356 4.64645C8.44732 4.74021 8.5 4.86739 8.5 5V8H11.5C11.6326 8 11.7598 8.05268 11.8536 8.14645C11.9473 8.24021 12 8.36739 12 8.5Z" fill="#18181B" /> </svg> ${e.time}</div>`),s+="</div>",t.innerHTML+=s,e.hasOwnProperty("title")&&(t.innerHTML+=`<div class="hero__last-post_title">${e.title}</div>`),t}(i),o=function(e){const t=Object.assign(document.createElement("div"),{className:"t-container t1001__container_column"});let s='<div class="descr-row">';return e.hasOwnProperty("href")&&(s+=`<div class="descr-link">${e.href}</div>`),e.hasOwnProperty("tags")&&(s+=e.tags),s+="</div>",t.innerHTML+=s,e.hasOwnProperty("descr")&&(t.innerHTML+=`<div class="description">${e.descr}</div>`),t}(i);s.prepend(r),s.append(o)}))}(async function(){await e(".uc-rubricator");const t=await e(".uc-rubricator .t976"),s=await e(".uc-rubricator .t976__wrapper"),i=s.querySelectorAll(".t976__list-item"),r=Object.assign(document.createElement("div"),{className:"t976_blur t976_blur-left"}),o=Object.assign(document.createElement("div"),{className:"t976_blur t976_blur-right"}),n=Object.assign(document.createElement("div"),{className:"anim-block",innerHTML:'<div class="anim-block-in"></div>'}),l=t.parentNode;l.prepend(r),l.append(o),l.append(n);const a=()=>{let e=10*(i.length-2);for(let t=0;t<i.length;t++)e+=i[t].offsetWidth;e+=10,s.style.width=e+"px"};a();const c={viewport:t,content:s,scrollMode:"native",pointerMode:"mouse",bounce:!1,onUpdate:e=>{e.borderCollision.left?(r.style.opacity=0,o.style.opacity=1):e.borderCollision.right?(r.style.opacity=1,o.style.opacity=0):(r.style.opacity=1,o.style.opacity=1)}};let d=new ScrollBooster(c);window.addEventListener("load",(()=>{d.destroy(),a(),d=new ScrollBooster(c)})),t.addEventListener("scroll",(()=>{const e=s.getBoundingClientRect().left-t.getBoundingClientRect().left,i=s.getBoundingClientRect().right-t.getBoundingClientRect().right;console.log("shiftRight "+i),console.log("shiftLeft "+e),e<5&&e>-5?(r.style.opacity=0,o.style.opacity=1):i<5&&i>-5?(r.style.opacity=1,o.style.opacity=0):(r.style.opacity=1,o.style.opacity=1)})),window.addEventListener("resize",function(e){let t,s,i=!1;return function r(){if(i)return t=arguments,void(s=this);e.apply(this,arguments),i=!0,setTimeout((function(){i=!1,t&&(r.apply(s,t),t=s=null)}),undefined)}}((()=>{d.destroy(),a(),d=new ScrollBooster(c)})),200)})(),async function(){const t=await e(".uc-hero");var i;t.classList.add("hide-posts"),i=await s(t),t.innerHTML+=`\n<div class="hero">\n    <div class="hero__container">\n        ${function(e){if(0==e.length)return"";const t=e[0],s=t.hasOwnProperty("img")?`<div class="hero__last-post_img-container"> <img class="hero__last-post_img" loading="lazy" alt="Крутое изображение поста" src="${t.hasOwnProperty("homeImg")?t.homeImg:t.img}" /></div>`:"",i=t.hasOwnProperty("title")?`<div class="hero__last-post_title">${t.title}</div>`:"",r=t.hasOwnProperty("date")?`<div class="post_date">${t.date}</div>`:"",o=t.hasOwnProperty("timeReading")?`<div class="post_time-reading"><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path\td="M8 2C6.71442 2 5.45772 2.38122 4.3888 3.09545C3.31988 3.80968 2.48676 4.82484 1.99479 6.01256C1.50282 7.20028 1.37409 8.50721 1.6249 9.76809C1.8757 11.029 2.49477 12.1872 3.40381 13.0962C4.31285 14.0052 5.47104 14.6243 6.73192 14.8751C7.99279 15.1259 9.29973 14.9972 10.4874 14.5052C11.6752 14.0132 12.6903 13.1801 13.4046 12.1112C14.1188 11.0423 14.5 9.78558 14.5 8.5C14.4982 6.77665 13.8128 5.12441 12.5942 3.90582C11.3756 2.68722 9.72335 2.00182 8 2ZM8 14C6.91221 14 5.84884 13.6774 4.94437 13.0731C4.0399 12.4687 3.33495 11.6098 2.91867 10.6048C2.50238 9.59977 2.39347 8.4939 2.60568 7.427C2.8179 6.36011 3.34173 5.3801 4.11092 4.61091C4.8801 3.84172 5.86011 3.3179 6.92701 3.10568C7.9939 2.89346 9.09977 3.00238 10.1048 3.41866C11.1098 3.83494 11.9687 4.53989 12.5731 5.44436C13.1774 6.34883 13.5 7.4122 13.5 8.5C13.4983 9.95818 12.9184 11.3562 11.8873 12.3873C10.8562 13.4184 9.45819 13.9983 8 14ZM12 8.5C12 8.63261 11.9473 8.75979 11.8536 8.85355C11.7598 8.94732 11.6326 9 11.5 9H8C7.86739 9 7.74022 8.94732 7.64645 8.85355C7.55268 8.75979 7.5 8.63261 7.5 8.5V5C7.5 4.86739 7.55268 4.74021 7.64645 4.64645C7.74022 4.55268 7.86739 4.5 8 4.5C8.13261 4.5 8.25979 4.55268 8.35356 4.64645C8.44732 4.74021 8.5 4.86739 8.5 5V8H11.5C11.6326 8 11.7598 8.05268 11.8536 8.14645C11.9473 8.24021 12 8.36739 12 8.5Z" fill="#18181B" /> </svg> ${t.timeReading} минут</div>`:"";return`\n    <div class="hero__last-post" data-id="${t.uid}">\n\t\t\t${s}\n            ${i}\n\t\t\t<div class="post__info">\n                ${r}\n                ${o}\n\t\t\t</div>\n\t</div>`}(i)}\n        <div class="popular-posts">\n\t\t\t<div class="popular-posts_title">Популярные статьи</div>\n\t\t\t<div class="popular-posts__wrapper">\n                <div class="popular-posts__inner">\n                    ${function(e){if(e.length<2)return"";let t="";for(let s=1;s<e.length;s++){const i=e[s],r=i.hasOwnProperty("tags")?`<div class="post_tag">${i.tags}</div>`:"",o=i.hasOwnProperty("title")?`<div class="post_title">${i.title}</div>`:"",n=i.hasOwnProperty("date")?`<div class="post_date">${i.date}</div>`:"",l=i.hasOwnProperty("timeReading")?`<div class="post_time-reading"><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path\td="M8 2C6.71442 2 5.45772 2.38122 4.3888 3.09545C3.31988 3.80968 2.48676 4.82484 1.99479 6.01256C1.50282 7.20028 1.37409 8.50721 1.6249 9.76809C1.8757 11.029 2.49477 12.1872 3.40381 13.0962C4.31285 14.0052 5.47104 14.6243 6.73192 14.8751C7.99279 15.1259 9.29973 14.9972 10.4874 14.5052C11.6752 14.0132 12.6903 13.1801 13.4046 12.1112C14.1188 11.0423 14.5 9.78558 14.5 8.5C14.4982 6.77665 13.8128 5.12441 12.5942 3.90582C11.3756 2.68722 9.72335 2.00182 8 2ZM8 14C6.91221 14 5.84884 13.6774 4.94437 13.0731C4.0399 12.4687 3.33495 11.6098 2.91867 10.6048C2.50238 9.59977 2.39347 8.4939 2.60568 7.427C2.8179 6.36011 3.34173 5.3801 4.11092 4.61091C4.8801 3.84172 5.86011 3.3179 6.92701 3.10568C7.9939 2.89346 9.09977 3.00238 10.1048 3.41866C11.1098 3.83494 11.9687 4.53989 12.5731 5.44436C13.1774 6.34883 13.5 7.4122 13.5 8.5C13.4983 9.95818 12.9184 11.3562 11.8873 12.3873C10.8562 13.4184 9.45819 13.9983 8 14ZM12 8.5C12 8.63261 11.9473 8.75979 11.8536 8.85355C11.7598 8.94732 11.6326 9 11.5 9H8C7.86739 9 7.74022 8.94732 7.64645 8.85355C7.55268 8.75979 7.5 8.63261 7.5 8.5V5C7.5 4.86739 7.55268 4.74021 7.64645 4.64645C7.74022 4.55268 7.86739 4.5 8 4.5C8.13261 4.5 8.25979 4.55268 8.35356 4.64645C8.44732 4.74021 8.5 4.86739 8.5 5V8H11.5C11.6326 8 11.7598 8.05268 11.8536 8.14645C11.9473 8.24021 12 8.36739 12 8.5Z" fill="#18181B" /> </svg> ${i.timeReading} минут </div> `:"";t+=`\n        <div class="popular-post" data-id="${i.uid}">\n\t\t\t${r}\n            ${o}\n\t\t\t<div class="post__info">\n\t\t\t\t${n}\n                ${l}\n\t\t\t</div>\n\t\t</div>`}return t}(i)}\n                </div>\n            </div>\n        </div>\n\t</div>\n</div>\n    `,function(e){e.querySelectorAll(".hero__last-post, .popular-post").forEach((t=>{t.addEventListener("click",(s=>{const i=e.querySelector(`.js-feed-post[data-post-uid="${t.dataset.id}"]`);i&&(i.click(),setTimeout((()=>{if(!document.querySelector(".t-feed__post-popup")){const e=i.querySelector("a");if(!e)return;e.click()}}),100),console.log("click"))}))}))}(t),function(e){const t=e.querySelector(".popular-posts__wrapper"),s=e.querySelector(".popular-posts__inner");if(!s||!t)return;const i=()=>{s.scrollHeight<=s.clientHeight||(0==s.scrollTop?(t.classList.add("bottom-fade"),t.classList.remove("top-fade")):s.scrollHeight<=s.scrollTop+s.clientHeight+5?(t.classList.remove("bottom-fade"),t.classList.add("top-fade")):(t.classList.add("top-fade"),t.classList.add("bottom-fade")))};i(),s.addEventListener("scroll",(e=>{i()}))}(t)}(),new MutationObserver(((e,o)=>{document.querySelectorAll(".uc-hero-slider").forEach((async e=>{if(e.classList.contains("hide-posts"))return;e.classList.add("hide-posts");const t=await s(e);new i(e,t)})),r(),document.querySelectorAll(".js-feed-post-text").forEach((e=>{if(!e.innerHTML.includes("====="))return;const t=e.innerHTML.split("=====");2==t.length?e.innerHTML=t[0]:3==t.length&&(e.innerHTML=t[0]+t[2])})),document.querySelectorAll('[data-record-type="915"]').forEach((e=>{e.classList.contains("uc-hero")||e.classList.contains("uc-hero-slider")||e.querySelectorAll(".js-feed-post-descr").forEach((e=>{if(!e.innerHTML.includes("====="))return;const s=e.innerHTML.split("=====");2==s.length?e.innerHTML=s[0]:3==s.length&&(e.innerHTML=s[0]+s[2]);const i=s[1].replaceAll(/(\r\n|\n|\r|<br>)/gm,"").split("^"),r=e.parentNode;let o="";const n=r.parentNode.querySelector(".js-feed-post-date");if(n){const e=n.textContent;e.includes(".")?o+=`<div class="post_date">${t(e)}</div>`:o+=`<div class="post_date">${e}</div>`}i.forEach((e=>{e.includes("теги")?r.innerHTML=`<div class="post_tag">${e.replace("теги","")}</div>`+r.innerHTML:e.includes("время")&&(o+=`<div class="post_time-reading"><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path\td="M8 2C6.71442 2 5.45772 2.38122 4.3888 3.09545C3.31988 3.80968 2.48676 4.82484 1.99479 6.01256C1.50282 7.20028 1.37409 8.50721 1.6249 9.76809C1.8757 11.029 2.49477 12.1872 3.40381 13.0962C4.31285 14.0052 5.47104 14.6243 6.73192 14.8751C7.99279 15.1259 9.29973 14.9972 10.4874 14.5052C11.6752 14.0132 12.6903 13.1801 13.4046 12.1112C14.1188 11.0423 14.5 9.78558 14.5 8.5C14.4982 6.77665 13.8128 5.12441 12.5942 3.90582C11.3756 2.68722 9.72335 2.00182 8 2ZM8 14C6.91221 14 5.84884 13.6774 4.94437 13.0731C4.0399 12.4687 3.33495 11.6098 2.91867 10.6048C2.50238 9.59977 2.39347 8.4939 2.60568 7.427C2.8179 6.36011 3.34173 5.3801 4.11092 4.61091C4.8801 3.84172 5.86011 3.3179 6.92701 3.10568C7.9939 2.89346 9.09977 3.00238 10.1048 3.41866C11.1098 3.83494 11.9687 4.53989 12.5731 5.44436C13.1774 6.34883 13.5 7.4122 13.5 8.5C13.4983 9.95818 12.9184 11.3562 11.8873 12.3873C10.8562 13.4184 9.45819 13.9983 8 14ZM12 8.5C12 8.63261 11.9473 8.75979 11.8536 8.85355C11.7598 8.94732 11.6326 9 11.5 9H8C7.86739 9 7.74022 8.94732 7.64645 8.85355C7.55268 8.75979 7.5 8.63261 7.5 8.5V5C7.5 4.86739 7.55268 4.74021 7.64645 4.64645C7.74022 4.55268 7.86739 4.5 8 4.5C8.13261 4.5 8.25979 4.55268 8.35356 4.64645C8.44732 4.74021 8.5 4.86739 8.5 5V8H11.5C11.6326 8 11.7598 8.05268 11.8536 8.14645C11.9473 8.24021 12 8.36739 12 8.5Z" fill="#18181B" /> </svg> ${e.replace("время","")} минут</div>`)}));const l=r.parentNode.querySelector(".t-feed__post-parts-date-row");""!=o&&(l.innerHTML=o)}))}))})).observe(document.documentElement,{childList:!0,subtree:!0}),r()}();