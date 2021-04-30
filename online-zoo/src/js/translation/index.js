import { Accordion } from '../components/accordion.js';

const accordionNode = document.querySelector('.accordion');
const accordion = new Accordion(accordionNode);
accordion.toggleSpoiler();
