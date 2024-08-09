!function(){"use strict";async function t(t,e=!1){return new Promise((s=>{const n=new MutationObserver(((n,i)=>{if(e){const n=e.querySelector(t);n&&(s(n),i.disconnect())}else{const e=document.querySelector(t);e&&(s(e),i.disconnect())}}));e?n.observe(e,{childList:!0,subtree:!0}):n.observe(document.documentElement,{childList:!0,subtree:!0})}))}(async function(){await t(".uc-rubricator");const e=await t(".uc-rubricator .t976"),s=await t(".uc-rubricator .t976__wrapper"),n=s.querySelectorAll(".t976__list-item"),i=Object.assign(document.createElement("div"),{className:"t976_blur t976_blur-left"}),o=Object.assign(document.createElement("div"),{className:"t976_blur t976_blur-right"}),r=Object.assign(document.createElement("div"),{className:"anim-block",innerHTML:'<div class="anim-block-in"></div>'}),a=e.parentNode;a.prepend(i),a.append(o),a.append(r);const l=()=>{let t=10*(n.length-2);for(let e=0;e<n.length;e++)t+=n[e].offsetWidth;t+=10,s.style.width=t+"px"};l();const c={viewport:e,content:s,scrollMode:"native",pointerMode:"mouse",bounce:!1,onUpdate:t=>{t.borderCollision.left?(i.style.opacity=0,o.style.opacity=1):t.borderCollision.right?(i.style.opacity=1,o.style.opacity=0):(i.style.opacity=1,o.style.opacity=1)}};let d=new ScrollBooster(c);window.addEventListener("load",(()=>{d.destroy(),l(),d=new ScrollBooster(c)})),e.addEventListener("scroll",(()=>{const t=s.getBoundingClientRect().left-e.getBoundingClientRect().left,n=s.getBoundingClientRect().right-e.getBoundingClientRect().right;console.log("shiftRight "+n),console.log("shiftLeft "+t),t<5&&t>-5?(i.style.opacity=0,o.style.opacity=1):n<5&&n>-5?(i.style.opacity=1,o.style.opacity=0):(i.style.opacity=1,o.style.opacity=1)})),window.addEventListener("resize",function(t){let e,s,n=!1;return function i(){if(n)return e=arguments,void(s=this);t.apply(this,arguments),n=!0,setTimeout((function(){n=!1,e&&(i.apply(s,e),e=s=null)}),undefined)}}((()=>{d.destroy(),l(),d=new ScrollBooster(c)})),200)})(),async function(){const e=await t(".uc-hero");var s;e.classList.add("hide-posts"),s=await async function(e){return new Promise((async s=>{const n=[],i=await async function(e){return new Promise((async s=>{const n=await t(".js-feed-container",e);new MutationObserver(((t,e)=>{if(null==n.dataset.sliderTotalslides)return;const i=n.querySelectorAll(".js-feed-post");Number(n.dataset.sliderTotalslides)==i.length&&s(i)})).observe(e,{childList:!0,subtree:!0})}))}(e);i.forEach((t=>{const e={};if(null==t.dataset.postUid)return;const s=t.querySelector(".js-feed-post-descr"),i=t.querySelector(".js-feed-post-date"),o=t.querySelector(".js-feed-post-title"),r=t.querySelector(".t-feed__post-bgimg");if(e.uid=t.dataset.postUid,i){const t=i.textContent;t.includes(".")?e.date=function(t){const e=t.split(".");let s="месяц";const n=Number(e[1]);switch(console.log(n),n){case 1:s="января";break;case 2:s="февраля";break;case 3:s="марта";break;case 4:s="апреля";break;case 5:s="мая";break;case 6:s="июня";break;case 7:s="июля";break;case 8:s="августа";break;case 9:s="сентября";break;case 10:s="октября";break;case 11:s="ноября";break;case 12:s="декабря"}return`${e[0]} ${s} ${e[2]}`}(t):e.date=t}if(o&&(e.title=o.textContent),r&&(e.img=r.dataset.original),s){const t=s.textContent;if(t.includes("=====")){const t=s.textContent.split("=====");e.description=t[0],t[1].split("^").forEach((t=>{t.includes("теги")?e.tags=t.replace("теги",""):t.includes("время")?e.timeReading=t.replace("время",""):t.includes("ссылка")&&(e.homeImg=t.replace("ссылка","").replace(" ",""))}))}else e.description=t}n.push(e)})),s(n)}))}(e),e.innerHTML+=`\n<div class="hero">\n    <div class="hero__container">\n        ${function(t){if(0==t.length)return"";const e=t[0],s=e.hasOwnProperty("img")?`<div class="hero__last-post_img-container"> <img class="hero__last-post_img" loading="lazy" alt="Крутое изображение поста" src="${e.img}" /></div>`:"",n=e.hasOwnProperty("title")?`<div class="hero__last-post_title">${e.title}</div>`:"",i=e.hasOwnProperty("date")?`<div class="post_date">${e.date}</div>`:"",o=e.hasOwnProperty("timeReading")?`\n        <div class="post_time-reading">\n\t\t\t\t\t<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t<path\n\t\t\t\t\t\td="M8 2C6.71442 2 5.45772 2.38122 4.3888 3.09545C3.31988 3.80968 2.48676 4.82484 1.99479 6.01256C1.50282 7.20028 1.37409 8.50721 1.6249 9.76809C1.8757 11.029 2.49477 12.1872 3.40381 13.0962C4.31285 14.0052 5.47104 14.6243 6.73192 14.8751C7.99279 15.1259 9.29973 14.9972 10.4874 14.5052C11.6752 14.0132 12.6903 13.1801 13.4046 12.1112C14.1188 11.0423 14.5 9.78558 14.5 8.5C14.4982 6.77665 13.8128 5.12441 12.5942 3.90582C11.3756 2.68722 9.72335 2.00182 8 2ZM8 14C6.91221 14 5.84884 13.6774 4.94437 13.0731C4.0399 12.4687 3.33495 11.6098 2.91867 10.6048C2.50238 9.59977 2.39347 8.4939 2.60568 7.427C2.8179 6.36011 3.34173 5.3801 4.11092 4.61091C4.8801 3.84172 5.86011 3.3179 6.92701 3.10568C7.9939 2.89346 9.09977 3.00238 10.1048 3.41866C11.1098 3.83494 11.9687 4.53989 12.5731 5.44436C13.1774 6.34883 13.5 7.4122 13.5 8.5C13.4983 9.95818 12.9184 11.3562 11.8873 12.3873C10.8562 13.4184 9.45819 13.9983 8 14ZM12 8.5C12 8.63261 11.9473 8.75979 11.8536 8.85355C11.7598 8.94732 11.6326 9 11.5 9H8C7.86739 9 7.74022 8.94732 7.64645 8.85355C7.55268 8.75979 7.5 8.63261 7.5 8.5V5C7.5 4.86739 7.55268 4.74021 7.64645 4.64645C7.74022 4.55268 7.86739 4.5 8 4.5C8.13261 4.5 8.25979 4.55268 8.35356 4.64645C8.44732 4.74021 8.5 4.86739 8.5 5V8H11.5C11.6326 8 11.7598 8.05268 11.8536 8.14645C11.9473 8.24021 12 8.36739 12 8.5Z"\n\t\t\t\t\t\tfill="#18181B"\n\t\t\t\t\t\t/>\n\t\t\t\t\t</svg>\n                    ${e.timeReading} минут\n                    </div>\n                    `:"";return`\n    <div class="hero__last-post" data-id="${e.uid}">\n\t\t\t${s}\n            ${n}\n\t\t\t<div class="post__info">\n                ${i}\n                ${o}\n\t\t\t</div>\n\t</div>`}(s)}\n        <div class="popular-posts">\n\t\t\t<div class="popular-posts_title">Популярные статьи</div>\n\t\t\t<div class="popular-posts__wrapper">\n                <div class="popular-posts__inner">\n                    ${function(t){if(t.length<2)return"";let e="";for(let s=1;s<t.length;s++){const n=t[s],i=n.hasOwnProperty("tags")?`<div class="post_tag">${n.tags}</div>`:"",o=n.hasOwnProperty("title")?`<div class="post_title">${n.title}</div>`:"",r=n.hasOwnProperty("date")?`<div class="post_date">${n.date}</div>`:"",a=n.hasOwnProperty("timeReading")?`\n        <div class="post_time-reading">\n\t\t\t\t\t<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t<path\n\t\t\t\t\t\td="M8 2C6.71442 2 5.45772 2.38122 4.3888 3.09545C3.31988 3.80968 2.48676 4.82484 1.99479 6.01256C1.50282 7.20028 1.37409 8.50721 1.6249 9.76809C1.8757 11.029 2.49477 12.1872 3.40381 13.0962C4.31285 14.0052 5.47104 14.6243 6.73192 14.8751C7.99279 15.1259 9.29973 14.9972 10.4874 14.5052C11.6752 14.0132 12.6903 13.1801 13.4046 12.1112C14.1188 11.0423 14.5 9.78558 14.5 8.5C14.4982 6.77665 13.8128 5.12441 12.5942 3.90582C11.3756 2.68722 9.72335 2.00182 8 2ZM8 14C6.91221 14 5.84884 13.6774 4.94437 13.0731C4.0399 12.4687 3.33495 11.6098 2.91867 10.6048C2.50238 9.59977 2.39347 8.4939 2.60568 7.427C2.8179 6.36011 3.34173 5.3801 4.11092 4.61091C4.8801 3.84172 5.86011 3.3179 6.92701 3.10568C7.9939 2.89346 9.09977 3.00238 10.1048 3.41866C11.1098 3.83494 11.9687 4.53989 12.5731 5.44436C13.1774 6.34883 13.5 7.4122 13.5 8.5C13.4983 9.95818 12.9184 11.3562 11.8873 12.3873C10.8562 13.4184 9.45819 13.9983 8 14ZM12 8.5C12 8.63261 11.9473 8.75979 11.8536 8.85355C11.7598 8.94732 11.6326 9 11.5 9H8C7.86739 9 7.74022 8.94732 7.64645 8.85355C7.55268 8.75979 7.5 8.63261 7.5 8.5V5C7.5 4.86739 7.55268 4.74021 7.64645 4.64645C7.74022 4.55268 7.86739 4.5 8 4.5C8.13261 4.5 8.25979 4.55268 8.35356 4.64645C8.44732 4.74021 8.5 4.86739 8.5 5V8H11.5C11.6326 8 11.7598 8.05268 11.8536 8.14645C11.9473 8.24021 12 8.36739 12 8.5Z"\n\t\t\t\t\t\tfill="#18181B"\n\t\t\t\t\t\t/>\n\t\t\t\t\t</svg>\n                    ${n.timeReading} минут\n                    </div>\n                    `:"";e+=`\n        <div class="popular-post" data-id="${n.uid}">\n\t\t\t${i}\n            ${o}\n\t\t\t<div class="post__info">\n\t\t\t\t${r}\n                ${a}\n\t\t\t</div>\n\t\t</div>`}return e}(s)}\n                </div>\n            </div>\n        </div>\n\t</div>\n</div>\n    `,function(t){t.querySelectorAll(".hero__last-post, .popular-post").forEach((e=>{e.addEventListener("click",(s=>{const n=t.querySelector(`.js-feed-post[data-post-uid="${e.dataset.id}"]`);n&&(n.click(),setTimeout((()=>{if(!document.querySelector(".t-feed__post-popup")){const t=n.querySelector("a");if(!t)return;t.click()}}),100),console.log("click"))}))}))}(e),function(t){const e=t.querySelector(".popular-posts__wrapper"),s=t.querySelector(".popular-posts__inner");if(!s||!e)return;const n=()=>{s.scrollHeight<=s.clientHeight||(0==s.scrollTop?(e.classList.add("bottom-fade"),e.classList.remove("top-fade")):s.scrollHeight<=s.scrollTop+s.clientHeight+5?(e.classList.remove("bottom-fade"),e.classList.add("top-fade")):(e.classList.add("top-fade"),e.classList.add("bottom-fade")))};n(),s.addEventListener("scroll",(t=>{n()}))}(e)}(),new MutationObserver(((t,e)=>{document.querySelectorAll('.js-feed-post-text, [data-record-type="915"]:not(.uc-hero) .js-feed-post-descr').forEach((t=>{if(!t.innerHTML.includes("====="))return;const e=t.innerHTML.split("=====");2==e.length?t.innerHTML=e[0]:3==e.length&&(t.innerHTML=e[0]+e[2])}))})).observe(document.documentElement,{childList:!0,subtree:!0})}();