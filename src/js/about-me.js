import Accordion from "accordion-js";
import "accordion-js/dist/accordion.min.css";


document.addEventListener('DOMContentLoaded', function() {
  const accordion = new Accordion(".accordion-container", {
    duration: 400, 
    ariaEnabled: true,
    showMultiple: true,
    collapse: true,
    openOnInit: [0], 
    onOpen: (currentElement) => {
      currentElement.classList.add('is-active'); 
    },
    onClose: (currentElement) => {
      currentElement.classList.remove('is-active'); 
    }
  });
});


import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

new Swiper(".skills-swiper", {
    slidesPerView: 6,
    slidesPerGroup: 1,
  loop: true,
    modules: [Navigation, Pagination, Keyboard ],
    navigation: {
      nextEl: ".skills-button",
    },
    keyboard: {
      enabled: true,
      pageUpDown: true,
    },
    mousewheel: {
      invert: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1440: {
        slidesPerView: 6,
      },
    },
    on: {
  slideChangeTransitionEnd: function (swiper) {
    document.querySelectorAll(".skills-text").forEach((e) => {
      e.classList.remove("color-red-point");
    });

    const firstSlide = swiper.slides[swiper.activeIndex];
    if (firstSlide) {
      const firstTextElement = firstSlide.querySelector(".skills-text");
      if (firstTextElement) {
        firstTextElement.classList.add("color-red-point");
      }
    }
  },
},
});
  