import { PetsCarousel, TestimonialsCarousel } from '../components/carousel.js';
import { Card } from '../components/card.js';
import { Popup } from '../components/popup.js';

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

new Popup({
  btnElem: document.querySelector('.testimonials-btn'),
  popupElem: document.getElementById('leave-feedback-popup'),
  coverElem: document.querySelector('.cover')
});
