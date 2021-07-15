import React, { FormEventHandler, ReactElement, useEffect, useState } from 'react';
import { AdminCardState } from '../models/app';

function NewCategoryCard(): ReactElement {
  const [cardState, updateState] = useState(AdminCardState.default);
  const [currentImage, updateImage] = useState('');

  const btnUpdateHandler = () => {
    updateState(AdminCardState.edit);
  };

  const btnCancelHandler = () => {
    updateState(AdminCardState.default);
  };

  const [inputs, setInputs] = useState({
    categoryName: '',
  });

  useEffect(() => {
    setInputs({ ...inputs, categoryName: '' });
    updateImage('');
  }, [cardState]);

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
    <div className="admin-card admin-category-card new-card">
      <div className="admin-card__top-block word-card">
        <p className="card-word">Add new category</p>
      </div>
      <button onClick={btnUpdateHandler} type="button" className="new-card__btn">
        +
      </button>
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

export default NewCategoryCard;
