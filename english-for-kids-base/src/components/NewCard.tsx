import React, { ChangeEvent, FormEventHandler, ReactElement, useEffect, useState } from 'react';
import { AdminCardState } from '../models/app';

import { API_URL, playAudio } from '../utils';

interface INewCard {
  category_id: number;
  setReload: (a: boolean) => void;
}

const NewCard = ({ category_id, setReload }: INewCard): ReactElement => {
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
    changeAudio('');
  }, [cardState]);

  const onChangeName: FormEventHandler = e => {
    const data = e.target as HTMLFormElement;
    setInputs({ ...inputs, [data.name]: data.value });
  };

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    let imageURL;
    const reader = new FileReader();
    reader.onload = () => {
      imageURL = reader.result;
      if (typeof imageURL !== 'string') {
        return;
      }
      changeImage(imageURL);
      console.log(imageURL);
    };
    if (!e.target.files) {
      return;
    }
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();

    try {
      const body = {
        category_id,
        word: inputs.word,
        translation: inputs.translation,
        audio: currentAudio,
        image: currentImage,
      };
      console.log(body);
      const res = await fetch(`${API_URL}/card`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await res.json();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    setReload(true);
    updateState(AdminCardState.default);
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
    <form onSubmit={onSubmit} className="admin-card">
      <div className="admin-card__top-block word-card">
        <input
          onChange={e => onChangeName(e)}
          name="word"
          type="text"
          placeholder="word"
          value={inputs.word}
          required
        />
        <input
          onChange={e => onChangeName(e)}
          name="translation"
          type="text"
          placeholder="translation"
          value={inputs.translation}
          required
        />
        <div className="admin-card__audio-edit">
          <label htmlFor="audio">
            Select new audio
            <input name="audio" id="audio" type="file" accept="audio/*" required />
          </label>
          <div onClick={audioHandler} aria-hidden="true" className="play-btn" />
        </div>
      </div>
      <div className="admin-card__image admin-card__image-edit">
        <label style={{ backgroundImage: `url(${currentImage})` }} htmlFor="image">
          <input
            onChange={e => onChangeImage(e)}
            name="image"
            id="image"
            type="file"
            accept="image/*"
            required
          />
        </label>
      </div>
      <div className="admin-card__btn-container">
        <button onClick={btnCancelHandler} type="submit" className="btn admin-card__btn cancel">
          Cancel
        </button>
      </div>
    </form>
  );

  return cardState === AdminCardState.default ? defaultState : editState;
};

export default NewCard;
