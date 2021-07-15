import React, { ChangeEvent, FormEventHandler, ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCardsByCategory } from '../data/getCardsData';
import { AdminCardState } from '../models/app';
import { ICard } from '../models/data';

import { IPropsCategoryCard } from '../models/props';
import { API_URL } from '../utils';

function AdminCategoryCard({ setReload, id, image, name }: IPropsCategoryCard): ReactElement {
  const [cardsData, updateData] = useState((): ICard[] => []);
  const [cardState, updateCardState] = useState(AdminCardState.default);
  const [currentImage, updateImage] = useState(image);
  const [inputs, setInputs] = useState({
    categoryName: name,
  });

  useEffect(() => {
    getCardsByCategory(id).then(data => updateData(data));
  }, []);

  useEffect(() => {
    setInputs({ ...inputs, categoryName: name });
    updateImage(image);
  }, [cardState]);

  const btnUpdateHandler = () => {
    updateCardState(AdminCardState.edit);
  };

  const btnCancelHandler = () => {
    updateCardState(AdminCardState.default);
  };

  const deleteHandler = async () => {
    try {
      const options = {
        method: 'DELETE',
      };
      await fetch(`${API_URL}/category/${id}`, options);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    if (setReload) {
      setReload(true);
    }
  };

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
      updateImage(imageURL);
    };
    if (!e.target.files) {
      return;
    }
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();

    try {
      const body = { id, name: inputs.categoryName, image: currentImage };
      const res = await fetch(`${API_URL}/category`, {
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
    updateCardState(AdminCardState.default);
  };

  const defaultState = (
    <div className="admin-card admin-category-card">
      <div className="admin-card__top-block">
        <p className="card-word">{name}</p>
        <p className="card-word">{cardsData.length} words</p>
        <div onClick={deleteHandler} aria-hidden="true" className="admin-card__delete" />
      </div>
      <img className="card-image admin-card__image" src={currentImage} alt="category description" />
      <div className="admin-card__btn-container">
        <button onClick={btnUpdateHandler} type="button" className="btn admin-card__btn">
          Update
        </button>
        <Link to={`/admin/${id}/words`} className="btn admin-card__btn">
          Add words
        </Link>
      </div>
    </div>
  );

  const editState = (
    <form onSubmit={onSubmit} className="admin-card admin-category-card">
      <div className="admin-card__top-block">
        <input
          onChange={e => onChangeName(e)}
          name="categoryName"
          type="text"
          placeholder="category name"
          value={inputs.categoryName}
          required
        />
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
}

export default AdminCategoryCard;
