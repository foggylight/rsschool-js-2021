export class Card {
  constructor(initCardsWrapper, initMap) {
    this.cardsWrapper = initCardsWrapper;
    this.cards = this.cardsWrapper.children;
    this.map = initMap;
    this.markers = this.map.children;
    
    this.markerListener();
  }

  changeCard(e) {
    e.preventDefault();

    const marker = e.target.closest('.map__link');
    const animal = marker.dataset.animal;

    const currentMarker = this.map.querySelector('.map__link_active');
    const currentCard = this.cardsWrapper.querySelector('.animal-card_active');
    const newCard = [...this.cards].find((card) => card.dataset.animal === animal);

    currentCard.classList.remove('animal-card_active');
    newCard.classList.add('animal-card_active');

    currentMarker.classList.remove('map__link_active');
    marker.classList.add('map__link_active');
  }

  markerListener() {
    [...this.markers].forEach((marker) => marker.addEventListener('click', (e) => this.changeCard(e)))
  }
}
