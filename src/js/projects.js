// import Swiper from 'swiper';
// import 'swiper/css';
// import 'swiper/css/navigation';

// document.addEventListener('DOMContentLoaded', function () {
//   const swiper = new Swiper('.swiper', {
//     slidesPerView: 1,
//     spaceBetween: 20,
//     navigation: {
//       nextEl: '.next',
//       prevEl: '.prev',
//     },
//     keyboard: {
//       enabled: true,
//       onlyInViewport: false,
//     },
//     breakpoints: {
//       768: {
//         slidesPerView: 2,
//       },
//       1024: {
//         slidesPerView: 3,
//       },
//     },
//     on: {
//       init: updateButtons,
//       slideChange: updateButtons,
//     },
//   });

//   function updateButtons() {
//     document.querySelector('.prev').disabled = swiper.isBeginning;
//     document.querySelector('.next').disabled = swiper.isEnd;
//   }
// });

import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

document.addEventListener('DOMContentLoaded', function () {
  const newswiper = new Swiper('.projects-swiper', {
    modules: [Navigation], // Подключаем модуль навигации
    slidesPerView: 1, // ✅ Всегда 1 слайд
    spaceBetween: 20, // Отступ между слайдами
    slidesPerGroup: 1, // ✅ Листает по 1 слайду
    loop: false, // Отключаем бесконечную прокрутку
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    // on: {
    //   init: function () {
    //     updateButtons(this);
    //   },
    //   slideChange: function () {
    //     updateButtons(this);
    //   },
    // },
  });

  //   function updateButtons(swiperInstance) {
  //     document.querySelector('.prev').disabled = swiperInstance.isBeginning;
  //     document.querySelector('.next').disabled = swiperInstance.isEnd;
  //   }
});
