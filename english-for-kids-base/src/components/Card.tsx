import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppMode, IState } from '../models/app';
import { IPropsCard } from '../models/props';
import { addMistake, addStar, endGame, spliceCards } from '../redux/actions';
import gameEngine from '../service';
import { sendToStorage, StorageValue } from '../storage';
import { correctSound, errorSound, playAudio } from '../utils';

const Card = ({ id, image, word, translation, audio }: IPropsCard): ReactElement => {
  const dispatch = useDispatch();

  const mode = useSelector((state: IState) => state.mode.mode);
  const currentCard = useSelector((state: IState) => state.game.game.currentCard);
  const currentCards = useSelector((state: IState) => state.game.game.currentCards);
  const isGameStarted = useSelector((state: IState) => state.game.game.isGameStarted);

  const [isFlipped, changeFlipState] = useState(false);
  const [isDisabled, disable] = useState(false);

  useEffect(() => {
    disable(false);
  }, [isGameStarted]);

  const flip = () => {
    changeFlipState(!isFlipped);
  };

  const checkCard = () => {
    if (!isGameStarted) {
      return;
    }

    if (currentCard?.id === id) {
      dispatch(spliceCards(currentCard));
      disable(!isDisabled);
      dispatch(addStar(true));
      sendToStorage(`${id}`, StorageValue.rightGuess);
      const sound = playAudio(correctSound);
      sound.onended = () => {
        if (currentCards.length === 1) {
          dispatch(endGame(true));
          return;
        }
        gameEngine();
      };
    } else {
      playAudio(errorSound);
      dispatch(addMistake());
      dispatch(addStar(false));
      sendToStorage(`${currentCard?.id}`, StorageValue.mistake);
    }
  };

  const train = () => {
    playAudio(audio);
    sendToStorage(`${id}`, StorageValue.click);
  };

  const renderCard = () => (
    <div className={`card ${isDisabled && 'disabled'} ${isFlipped && 'flipped'}`}>
      <div
        onClick={mode === AppMode.train ? train : () => null}
        aria-hidden="true"
        className="card__front"
      >
        <img
          className={`card-image ${mode === AppMode.play && 'game-mode'}`}
          src={image}
          alt="word description"
        />
        {mode === AppMode.train && (
          <div className="card__text-block">
            <p className="card-word">{word}</p>
            <button
              onClick={flip}
              className="card__flip-btn"
              aria-label="Show translation"
              type="button"
            />
          </div>
        )}
      </div>
      <div className="card__back">
        <img className="card-image" src={image} alt="word description" />
        <div className="card__text-block">
          <p className="card-word ru">{translation}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div
      onMouseLeave={isFlipped ? flip : () => null}
      onClick={mode === AppMode.play && !isDisabled ? checkCard : () => null}
      aria-hidden="true"
      className="card-container"
    >
      {renderCard()}
    </div>
  );
};

export default Card;
