import React, { ReactElement, useState } from 'react';
import { IPropsCard } from '../models/props';

function Card({ image, word, translation, audio }: IPropsCard): ReactElement {
  const [isFlipped, changeState] = useState(false);

  const flip = () => {
    changeState(() => !isFlipped);
  };

  return (
    <div onMouseLeave={isFlipped ? flip : () => null} aria-hidden="true" className="card-container">
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        <div className="card__front">
          <img className="card-image" src={image} alt="word description" />
          <div className="card__text-block">
            <p className="card-word">{word}</p>
            <button
              onClick={flip}
              className="card__flip-btn"
              aria-label="Show translation"
              type="button"
            />
          </div>
        </div>
        <div className="card__back">
          <img className="card-image" src={image} alt="word description" />
          <div className="card__text-block">
            <p className="card-word ru">{translation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
