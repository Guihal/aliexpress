import { LastPost } from "./LastPost";
import { PopularPosts } from "./PopularPosts";

export function addHero(infoPosts, blockWrapper) {
	blockWrapper.innerHTML += `
<div class="hero">
    <div class="hero__container">
        ${LastPost(infoPosts)}
        <div class="popular-posts">
			<div class="popular-posts_title">Популярные статьи</div>
			<div class="popular-posts__wrapper">
                <div class="popular-posts__inner">
                    ${PopularPosts(infoPosts)}
                </div>
            </div>
        </div>
	</div>
</div>
    `;
}
