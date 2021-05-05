export class Card {
  constructor(initCardsWrapper, initMap) {
    this.cardsWrapper = initCardsWrapper;
    this.cards = this.cardsWrapper.children;
    this.map = initMap;
    this.markers = this.map.children;

    this.markerListener();
  }

  hide() {
    const currentCard = this.cardsWrapper.querySelector('.animal-card_active');
    const currentMarker = this.map.querySelector('.map__link_active');
    currentCard.classList.remove('animal-card_active');
    currentMarker.classList.remove('map__link_active');
  }

  show({ target }) {
    const marker = target.closest('.map__link');
    const animal = marker.dataset.animal;
    const newCard = [...this.cards].find((card) => card.dataset.animal === animal);

    newCard.classList.add('animal-card_active');
    marker.classList.add('map__link_active');
  }

  changeCard(e) {
    e.preventDefault();

    if (this.cardsWrapper.querySelector('.animal-card_active')) {
      this.hide();
    }
    this.show(e);
  }

  markerListener() {
    [...this.markers].forEach((marker) => marker.addEventListener('click', (e) => this.changeCard(e)))
  }
}

export class CardForMapPage extends Card {
  constructor(initCardsWrapper, initMap) {
    super(initCardsWrapper, initMap);

    this.additionalClosing();
  }

  additionalClosing() {
    const cover = document.querySelector('.map-cover');
    cover.addEventListener('click', () => this.hide());
  }
}
