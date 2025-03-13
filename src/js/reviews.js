// Імпорт iziToast для сповіщень
import iziToast from 'izitoast';
// Імпорт стилів iziToast
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener("DOMContentLoaded", async () => {
    const reviewsList = document.getElementById("reviews-list");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    const apiUrl = "https://portfolio-js.b.goit.study/api/reviews";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch reviews");

        const reviews = await response.json();
        if (reviews.length === 0) {
            reviewsList.innerHTML = "<p class='error-message'>No reviews available</p>";
            return;
        }

        reviewsList.innerHTML = "";
        reviews.slice(0, 6).forEach(review => {
            const reviewItem = document.createElement("div");
            reviewItem.classList.add("swiper-slide");
            reviewItem.innerHTML = `
                <div class="review">
                    <img 
                        src="${review.avatar_url || 'images/default-avatar.png'}" 
                        alt="${review.author}" 
                        class="review-avatar" 
                        loading="lazy" 
                    >
                    <h3 class="review-author">${review.author}</h3>
                    <p class="review-text">${review.review}</p>
                </div>
            `;
            reviewsList.appendChild(reviewItem);
        });

        const swiper = new Swiper(".swiper", {
            slidesPerView: 1,
            spaceBetween: 16,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                type: "bullets",
            },
            breakpoints: {
                768: { slidesPerView: 2, spaceBetween: 16 },
                1440: { slidesPerView: 4, spaceBetween: 16 },
            },
            on: {
                init: function () {
                    setEqualHeight();
                },
                resize: function () {
                    setEqualHeight();
                }
            }
        });

        function setEqualHeight() {
            let maxHeight = 0;
            document.querySelectorAll(".swiper-slide").forEach(slide => {
                slide.style.height = "auto";
                maxHeight = Math.max(maxHeight, slide.offsetHeight);
            });
            document.querySelectorAll(".swiper-slide").forEach(slide => {
                slide.style.height = `${maxHeight}px`;
            });
        }

        swiper.on('slideChange', setEqualHeight);
        setEqualHeight();

        prevButton.addEventListener("click", () => swiper.slidePrev());
        nextButton.addEventListener("click", () => swiper.slideNext());

    } catch (error) {
        reviewsList.innerHTML = "<p class='error-message'>Not found</p>";
        iziToast.error({
            title: "Error",
            message: "Failed to load reviews",
            position: "topRight",
        });
        console.error("Error loading reviews:", error);
    }
});
