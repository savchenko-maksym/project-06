document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".next",
      prevEl: ".prev",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
    on: {
      init: updateButtons,
      slideChange: updateButtons,
    },
  });

  function updateButtons() {
    document.querySelector(".prev").disabled = swiper.isBeginning;
    document.querySelector(".next").disabled = swiper.isEnd;
  }
});
