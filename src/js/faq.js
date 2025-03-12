import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

document.addEventListener('DOMContentLoaded', function () {
  new Accordion('.accordion__list', {
    duration: 600,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    showMultiple: true,
    triggerClass: 'accordion__text',
    elementClass: 'accordion__item',
    activeClass: 'active',
    panelClass: 'accordion__panel',
    collapse: true,
    beforeOpen: (currentElement) => {
      const icon = currentElement.querySelector('.accordion__icon');
      if (icon) icon.classList.add('rotated');
    },
    beforeClose: (currentElement) => {
      const icon = currentElement.querySelector('.accordion__icon');
      if (icon) icon.classList.remove('rotated');
    }
  });
});