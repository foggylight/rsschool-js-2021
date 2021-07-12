import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../components/Card';
import { getCardsByCategory } from '../data/getCardsData';
import { AppMode, IState } from '../models/app';
import { ICard } from '../models/data';
import { IPropsCategory } from '../models/props';
import { addCards, resetGame, startGame } from '../redux/actions';
import gameEngine from '../service';
import { getDifficultWords } from '../storage';
import { playAudio } from '../utils';
import EndGame from './EndGame';

const Category = ({ id, name }: IPropsCategory): ReactElement => {
  const dispatch = useDispatch();

  const mode = useSelector((state: IState) => state.mode.mode);
  const currentCard = useSelector((state: IState) => state.game.game.currentCard);
  const stars = useSelector((state: IState) => state.game.game.stars);
  const isGameStarted = useSelector((state: IState) => state.game.game.isGameStarted);
  const isGameEnded = useSelector((state: IState) => state.game.game.isGameEnded);

  const [cardsData, updateData] = useState((): ICard[] => []);

  useEffect(() => {
    if (id === 0) {
      getDifficultWords().then(data => updateData(data));
    } else {
      getCardsByCategory(id).then(data => updateData(data));
    }
  }, []);

  useEffect(() => {
    dispatch(resetGame());
  }, []);

  const cards = cardsData.map(card => (
    <Card
      key={card.id}
      id={card.id}
      image={card.image}
      audio={card.audio}
      word={card.word}
      translation={card.translation}
    />
  ));

  const start = () => {
    const cardsAudio = cardsData.map(data => {
      return { id: data.id, audio: data.audio };
    });
    dispatch(addCards(cardsAudio));
    gameEngine();

    dispatch(startGame(true));
  };

  const repeatWord = () => {
    if (currentCard) {
      playAudio(currentCard.audio);
    }
  };

  const startBtn = (
    <button onClick={isGameStarted ? repeatWord : start} className="btn game-btn" type="button">
      {isGameStarted ? '' : 'Start game!'}
      <img
        className="game-btn__icon"
        height="100%"
        width="100%"
        src={`./${isGameStarted ? 'looping-arrows' : 'play-button'}.svg`}
        alt=""
      />
    </button>
  );

  const starsField = (
    <div className="stars-field">
      {stars.map(star => (
        <img
          key={star.id}
          className="stars"
          src={`./${star.isCorrect ? 'heart' : 'broken-heart'}.svg`}
          alt=""
        />
      ))}
    </div>
  );

  const mainScreen = (
    <main className="main-container">
      <div className="category-header">
        <h2 className="category-name">{name}</h2>
        {mode === AppMode.play ? starsField : null}
        {mode === AppMode.play ? startBtn : null}
      </div>
      <div className="cards-field">{cards}</div>
    </main>
  );

  const mistakes = useSelector((state: IState) => state.game.game.mistakes);

  const endGameScreen = <EndGame isSuccessful={!mistakes} />;

  return isGameEnded ? endGameScreen : mainScreen;
};

export default Category;
