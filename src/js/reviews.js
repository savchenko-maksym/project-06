import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener("DOMContentLoaded", async () => {
    const reviewsList = document.getElementById("reviews-list");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const swiperContainer = document.querySelector(".swiper-reviews");

    if (!reviewsList || !swiperContainer) {
        console.error("Element #reviews-list or .swiper-reviews not found.");
        return;
    }
    
    const apiUrl = "https://portfolio-js.b.goit.study/api/reviews";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch reviews");

        const reviews = await response.json();
        if (!Array.isArray(reviews) || reviews.length === 0) {
            reviewsList.innerHTML = "<p class='error-message'>No reviews available</p>";
            return;
        }

        reviewsList.innerHTML = "";
        reviews.forEach(review => {
            const reviewItem = document.createElement("div");
            reviewItem.classList.add("swiper-slide"); // Тут було помилково swiper-slide-reviews
            reviewItem.innerHTML = `
                <div class="container-review">
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

        // Затримка перед ініціалізацією Swiper (щоб кнопки точно були доступні)
        setTimeout(() => {
            new Swiper(swiperContainer, {
                modules: [Navigation, Pagination, Keyboard],
                slidesPerView: 1,
                spaceBetween: 16,
                navigation: {
                    nextEl: "#next-button",
                    prevEl: "#prev-button",
                },
                breakpoints: {
                    768: { slidesPerView: 2, spaceBetween: 16 },
                    1440: { slidesPerView: 4, spaceBetween: 16 },
                }
            });
        }, 100);
        
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
