import { changeCurrentCard } from './redux/actions';
import store from './redux/store';
import { getRandomInt, playAudio } from './utils';

const gameEngine = (): void => {
  const { game } = store.getState();
  const data = game.game.currentCards;

  const cardsCount = data.length;
  const random = getRandomInt(cardsCount - 1);

  const currentCard = data[random];
  store.dispatch(changeCurrentCard(currentCard));

  playAudio(currentCard.audio);
};

export default gameEngine;
