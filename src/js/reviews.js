// import Swiper bundle with all modules installed
import Swiper from 'swiper';

// import styles bundle
import 'swiper/css';

function doFetch(foo, murkUpFoo) {
  const REVIEWS_LIST = document.getElementById('reviewsList');
  fetch('https://portfolio-js.b.goit.study/api/reviews')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(reviews => {
      const markup = reviews
        .map(review => {
          return murkUpFoo(review);
        })
        .join('');

      REVIEWS_LIST.innerHTML = markup; // Вставляємо HTML у список відгуків
      foo();
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        title: 'Помилка',
        message: 'Не вдалося завантажити список відгуків',
      });
      REVIEWS_LIST.innerHTML = 'Not found'; // Відображаємо текст-заглушку
    });
}

const SCREEN_WIDTH = window.innerWidth;
let slidesPerView;

if (SCREEN_WIDTH >= 1440) {
  slidesPerView = 4;
} else if (SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1440) {
  slidesPerView = 2;
} else if (SCREEN_WIDTH < 768) {
  slidesPerView = 1;
}

function createSwiper() {
  const SWIPER = new Swiper('.reviews-swiper', {
    // Optional parameters
    // cssMode: true,
    navigation: true,

    slidesPerView: slidesPerView,
    slidesPerGroup: 1,
    // Navigation arrows
    // navigation: {
    //   disabledClass: 'BtnOff',
    //   nextEl: '.reviews-left',
    //   prevEl: '.reviews-right',
    // },
    navigation: {
      nextEl: '.ButtonPrev',
      prevEl: '.ButtonNext',
    },
    mousewheel: true,
    keyboard: true,
    touch: true,
  });
}

function doMurkUp(review) {
  return `
        <div class="Review swiper-slide">
        <img class="UserIcon" src="${review.avatar_url}" alt="Avatar">
          <h4 class="Name">${review.author}</h4>
          <p class="ReviewText">${review.review}</p>
        </div>
      `;
}

// запит з бекенду=========================================================

doFetch(createSwiper, doMurkUp);
