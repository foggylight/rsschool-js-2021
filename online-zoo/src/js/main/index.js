import { PetsCarousel } from '../components/carousel.js';

new PetsCarousel({
  carouselNode: document.getElementById('famous-pets-slider'),
  carouselPrev: document.querySelector('.famous-pets-nav__arrow_prev'),
  carouselNext: document.querySelector('.famous-pets-nav__arrow_next'),
});
