import { Accordion } from '../components/accordion.js';
import { CamsCarousel } from '../components/carousel.js';

new Accordion(document.getElementById('accordion'));

new CamsCarousel({
  carouselNode: document.getElementById('video-slider'),
  carouselPrev: document.querySelector('.slider-nav__arrow_prev'),
  carouselNext: document.querySelector('.slider-nav__arrow_next'),
});
