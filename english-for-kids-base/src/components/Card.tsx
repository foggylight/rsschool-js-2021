import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppMode, IModeState } from '../models/app';
import { IPropsCard } from '../models/props';

const Card = (props: IPropsCard): ReactElement => {
  const { image, word, translation, audio } = props;

  const mode = useSelector((state: IModeState) => state.mode);

  const playAudio = () => {
    const newAudio = new Audio(audio);
    newAudio.play();
  };

  const [isFlipped, changeState] = useState(false);

  const flip = () => {
    changeState(() => !isFlipped);
  };

  return (
    <div onMouseLeave={isFlipped ? flip : () => null} aria-hidden="true" className="card-container">
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        <div
          onClick={mode === AppMode.train ? playAudio : () => null}
          aria-hidden="true"
          className="card__front"
        >
          <img
            className={`card-image ${mode === AppMode.play ? 'game-mode' : ''}`}
            src={image}
            alt="word description"
          />
          {mode === AppMode.train ? (
            <div className="card__text-block">
              <p className="card-word">{word}</p>
              <button
                onClick={flip}
                className="card__flip-btn"
                aria-label="Show translation"
                type="button"
              />
            </div>
          ) : (
            ''
          )}
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
};

export default Card;
