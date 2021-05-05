import { PetsCarousel, TestimonialsCarousel } from '../components/carousel.js';
import { Card } from '../components/map.js';

new PetsCarousel({
  carouselNode: document.getElementById('famous-pets-slider'),
  carouselPrev: document.querySelector('.famous-pets-nav__arrow_prev'),
  carouselNext: document.querySelector('.famous-pets-nav__arrow_next'),
});

new TestimonialsCarousel({
  carouselNode: document.getElementById('testimonials-slider'),
  carouselPrev: document.querySelector('.testimonials-slider__nav-arrow_prev'),
  carouselNext: document.querySelector('.testimonials-slider__nav-arrow_next'),
});

new Card(document.getElementById('cards-wrapper'), document.getElementById('map'));
