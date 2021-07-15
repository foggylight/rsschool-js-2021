import React, { FormEventHandler, ReactElement, useEffect, useState } from 'react';
import { AdminCardState } from '../models/app';

import { IPropsCard } from '../models/props';
import { playAudio } from '../utils';

const AdminCard = ({ id, image, word, translation, audio }: IPropsCard): ReactElement => {
  const [cardState, updateState] = useState(AdminCardState.default);
  const [inputs, setInputs] = useState({
    word,
    translation,
  });

  const onChangeName: FormEventHandler = e => {
    const data = e.target as HTMLFormElement;
    setInputs({ ...inputs, [data.name]: data.value });
  };

  const btnUpdateHandler = () => {
    updateState(AdminCardState.edit);
  };

  const btnCancelHandler = () => {
    updateState(AdminCardState.default);
  };

  const audioHandler = () => {
    playAudio(audio);
  };

  const defaultState = (
    <div className="admin-card">
      <div className="admin-card__top-block word-card">
        <p className="admin-card__text">
          <span>Word: </span>
          {word}
        </p>
        <p className="admin-card__text">
          <span>Translation: </span>
          {translation}
        </p>
        <p onClick={audioHandler} aria-hidden="true" className="admin-card__text audio">
          <span>Audio: </span>
          {`...${audio.slice(-18)}`}
        </p>
      </div>
      <img className="card-image admin-card__image" src={image} alt="category description" />
      <div className="admin-card__btn-container">
        <button onClick={btnUpdateHandler} type="button" className="btn admin-card__btn">
          Change
        </button>
      </div>
    </div>
  );

  const editState = (
    <form className="admin-card">
      <div className="admin-card__top-block word-card">
        <input
          onChange={e => onChangeName(e)}
          name="word"
          type="text"
          placeholder="translation"
          value={inputs.word}
        />
        <input
          onChange={e => onChangeName(e)}
          name="translation"
          type="text"
          placeholder="translation"
          value={inputs.translation}
        />
        <div className="admin-card__audio-edit">
          <label htmlFor="audio">
            Select new audio
            <input name="audio" id="audio" type="file" accept="audio/*" />
          </label>
          <div onClick={audioHandler} aria-hidden="true" className="play-btn" />
        </div>
      </div>
      <div className="admin-card__image admin-card__image-edit">
        <label style={{ backgroundImage: `url(${image})` }} htmlFor="image">
          <input name="image" id="image" type="file" accept=".png .jpg .jpeg" />
        </label>
      </div>
      <div className="admin-card__btn-container">
        <button onClick={btnCancelHandler} type="button" className="btn admin-card__btn cancel">
          Cancel
        </button>
      </div>
    </form>
  );

  return cardState === AdminCardState.default ? defaultState : editState;
};

export default AdminCard;
