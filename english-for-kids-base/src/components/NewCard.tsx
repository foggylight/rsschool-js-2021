import React, { FormEventHandler, ReactElement, useEffect, useState } from 'react';
import { AdminCardState } from '../models/app';

import { playAudio } from '../utils';

const NewCard = (): ReactElement => {
  const [cardState, updateState] = useState(AdminCardState.default);
  const [currentAudio, changeAudio] = useState('');
  const [currentImage, changeImage] = useState('');
  const [inputs, setInputs] = useState({
    word: '',
    translation: '',
  });

  useEffect(() => {
    setInputs({ ...inputs, word: '', translation: '' });
    changeImage('');
  }, [cardState]);

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
    if (audioHandler.length === 0) {
      return;
    }
    playAudio(currentAudio);
  };

  const defaultState = (
    <div className="admin-card new-card">
      <div className="admin-card__top-block word-card">
        <p className="card-word">Add new word</p>
      </div>
      <button onClick={btnUpdateHandler} type="button" className="new-card__btn">
        +
      </button>
    </div>
  );

  const editState = (
    <form className="admin-card">
      <div className="admin-card__top-block word-card">
        <input
          onChange={e => onChangeName(e)}
          name="word"
          type="text"
          placeholder="word"
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
        <label style={{ backgroundImage: `url(${currentImage})` }} htmlFor="image">
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

export default NewCard;
