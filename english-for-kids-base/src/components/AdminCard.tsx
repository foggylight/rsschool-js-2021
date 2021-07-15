import React, { ChangeEvent, FormEventHandler, ReactElement, useEffect, useState } from 'react';
import { AdminCardState } from '../models/app';
import { IPropsCard } from '../models/props';
import { API_URL, playAudio } from '../utils';

const AdminCard = ({
  setReload,
  id,
  category_id,
  image,
  word,
  translation,
  audio,
}: IPropsCard): ReactElement => {
  const [cardState, updateState] = useState(AdminCardState.default);
  const [currentImage, changeImage] = useState(image);
  const [currentAudio, changeAudio] = useState(audio);
  const [inputs, setInputs] = useState({
    word,
    translation,
  });

  useEffect(() => {
    setInputs({ ...inputs, word, translation });
    changeAudio(audio);
  }, [cardState]);

  const onChangeWord: FormEventHandler = e => {
    const data = e.target as HTMLFormElement;
    setInputs({ ...inputs, [data.name]: data.value });
  };

  const onChangeAudio = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const sound = document.getElementById('audio') as HTMLAudioElement;
    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result;
      if (typeof res === 'string') {
        sound.src = res;
        sound.controls = true;
        changeAudio('');
      }
    };
    reader.readAsDataURL(e.target.files[0]);
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
    };
    if (!e.target.files) {
      return;
    }
    reader.readAsDataURL(e.target.files[0]);
  };

  const deleteHandler = async () => {
    try {
      const options = {
        method: 'DELETE',
      };
      await fetch(`${API_URL}/card/${id}`, options);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    if (setReload) {
      setReload(true);
    }
  };

  const btnUpdateHandler = () => {
    updateState(AdminCardState.edit);
  };

  const btnCancelHandler = () => {
    updateState(AdminCardState.default);
    changeImage(image);
  };

  const audioDefaultHandler = () => {
    playAudio(audio);
  };

  const audioHandler = () => {
    if (currentAudio.length !== 0) {
      playAudio(currentAudio);
      return;
    }
    const sound = document.getElementById('audio') as HTMLAudioElement;
    playAudio(sound.src);
  };

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();
    let newAudio;
    if (currentAudio.length !== 0) {
      newAudio = currentAudio;
    } else {
      const sound = document.getElementById('audio') as HTMLAudioElement;
      newAudio = sound.src;
    }

    try {
      const body = {
        id,
        categoryId: category_id,
        word: inputs.word,
        translation: inputs.translation,
        audio: newAudio,
        image: currentImage,
      };
      const res = await fetch(`${API_URL}card`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await res.json();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    if (setReload) {
      setReload(true);
    }
    updateState(AdminCardState.default);
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
        <p onClick={audioDefaultHandler} aria-hidden="true" className="admin-card__text audio">
          <span>Audio: </span>
        </p>
        <div onClick={deleteHandler} aria-hidden="true" className="admin-card__delete" />
      </div>
      <img className="card-image admin-card__image" src={currentImage} alt="category description" />
      <div className="admin-card__btn-container">
        <button onClick={btnUpdateHandler} type="button" className="btn admin-card__btn">
          Change
        </button>
      </div>
    </div>
  );

  const editState = (
    <form onSubmit={onSubmit} className="admin-card">
      <div className="admin-card__top-block word-card">
        <input
          onChange={e => onChangeWord(e)}
          name="word"
          type="text"
          placeholder="word"
          value={inputs.word}
        />
        <input
          onChange={e => onChangeWord(e)}
          name="translation"
          type="text"
          placeholder="translation"
          value={inputs.translation}
        />
        <div className="admin-card__audio-edit">
          <label htmlFor="audio">
            Select new audio
            <input
              onChange={e => onChangeAudio(e)}
              name="audio"
              id="audio"
              type="file"
              accept="audio/*"
            />
          </label>
          <div onClick={audioHandler} aria-hidden="true" className="play-btn" />
          <audio id="audio" src={`${currentAudio}`}>
            <track kind="captions" />
          </audio>
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
          />
        </label>
      </div>
      <div className="admin-card__btn-container">
        <button onClick={btnCancelHandler} type="button" className="btn admin-card__btn cancel">
          Cancel
        </button>
        <button type="submit" className="btn admin-card__btn">
          Save
        </button>
      </div>
    </form>
  );

  return cardState === AdminCardState.default ? defaultState : editState;
};

export default AdminCard;
