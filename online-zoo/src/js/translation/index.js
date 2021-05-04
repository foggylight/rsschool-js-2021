import { Accordion } from '../components/accordion.js';
import { Carousel } from '../components/carousel.js';

new Accordion(document.getElementById('accordion'));

new Carousel({
  carouselNode: document.getElementById('video-slider'),
  carouselPrev: document.querySelector('.slider-nav__arrow_prev'),
  carouselNext: document.querySelector('.slider-nav__arrow_next'),
});
