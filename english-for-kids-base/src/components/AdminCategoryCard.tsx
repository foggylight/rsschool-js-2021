import React, { FormEventHandler, ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCardsByCategory } from '../data/getCardsData';
import { AdminCardState } from '../models/app';
import { ICard } from '../models/data';

import { IPropsCategoryCard } from '../models/props';

function AdminCategoryCard({ id, image, name }: IPropsCategoryCard): ReactElement {
  const [cardsData, updateData] = useState((): ICard[] => []);
  const [cardState, updateState] = useState(AdminCardState.default);
  const [currentImage, updateImage] = useState(image);

  useEffect(() => {
    getCardsByCategory(id).then(data => updateData(data));
  }, []);

  const btnUpdateHandler = () => {
    updateState(AdminCardState.edit);
  };

  const btnCancelHandler = () => {
    updateState(AdminCardState.default);
  };

  const [inputs, setInputs] = useState({
    categoryName: name,
  });

  const onChangeName: FormEventHandler = e => {
    const data = e.target as HTMLFormElement;
    setInputs({ ...inputs, [data.name]: data.value });
  };

  const onChangeImage: FormEventHandler = ({ target }) => {
    let imageURL;
    const reader = new FileReader();
    reader.onload = () => {
      imageURL = reader.result;
      if (typeof imageURL !== 'string') {
        return;
      }
      updateImage(imageURL);
    };
    console.log(target);
    // reader.readAsDataURL(target.files[0]);
  };

  const defaultState = (
    <div className="admin-card admin-category-card">
      <div className="admin-card__top-block">
        <p className="card-word">{name}</p>
        <p className="card-word">{cardsData.length} words</p>
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
    <form className="admin-card admin-category-card">
      <div className="admin-card__top-block">
        <input
          onChange={e => onChangeName(e)}
          name="categoryName"
          type="text"
          placeholder="category name"
          value={inputs.categoryName}
        />
      </div>
      <div className="admin-card__image admin-card__image-edit">
        <label style={{ backgroundImage: `url(${image})` }} htmlFor="image">
          <input
            onChange={e => onChangeImage(e)}
            name="image"
            id="image"
            type="file"
            accept=".png .jpg .jpeg"
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
