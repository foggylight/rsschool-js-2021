import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import Card from '../components/Card';
import getCardsData from '../data/getCardsData';
import { AppMode, IModeState } from '../models/app';
import { IPropsCategory } from '../models/props';

function Category({ id, name }: IPropsCategory): ReactElement {
  const mode = useSelector((state: IModeState) => state.mode);

  const cardsData = getCardsData().filter(card => card.categoryId === id);

  const cards = cardsData.map(card => (
    <Card
      key={card.id}
      image={card.image}
      audio={card.audio}
      word={card.word}
      translation={card.translation}
    />
  ));

  const startGame = () => {
    const cardsAudio = cardsData.map(data => {
      return { id: data.id, audio: data.audio };
    });

    console.log(cardsAudio);
  };

  const startBtn = (
    <button onClick={startGame} className="btn game-btn" type="button">
      <img
        className="game-btn__icon"
        height="100%"
        width="100%"
        src="../../public/play-button.svg"
        alt=""
      />
      Start game!
    </button>
  );

  const starsField = <div className="stars-field" />;

  return (
    <main className="cards-container">
      <div className="category-header">
        <h2 className="category-name">{name}</h2>
        {mode === AppMode.play ? starsField : null}
        {mode === AppMode.play ? startBtn : null}
      </div>
      <div className="cards-field">{cards}</div>
    </main>
  );
}

export default Category;
