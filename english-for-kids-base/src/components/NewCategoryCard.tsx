import React, { ChangeEvent, FormEventHandler, ReactElement, useEffect, useState } from 'react';
import { AdminCardState } from '../models/app';
import { API_URL } from '../utils';

function NewCategoryCard({
  setReload,
}: {
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactElement {
  const [cardState, updateCardState] = useState(AdminCardState.default);
  const [currentImage, updateImage] = useState('');
  const [inputs, setInputs] = useState({
    categoryName: '',
  });

  const btnUpdateHandler = () => {
    updateCardState(AdminCardState.edit);
  };

  const btnCancelHandler = () => {
    updateCardState(AdminCardState.default);
  };

  useEffect(() => {
    setInputs({ ...inputs, categoryName: '' });
    updateImage('');
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
      const body = { name: inputs.categoryName, image: currentImage };
      const res = await fetch(`${API_URL}/category`, {
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
    updateCardState(AdminCardState.default);
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
            required
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
