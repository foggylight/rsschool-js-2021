import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { AppMode } from '../models/app';
import { changeMode, resetGame } from '../redux/actions';

function ToggleSwitch(): ReactElement {
  const dispatch = useDispatch();

  const inputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target) {
      return;
    }
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const mode = value ? AppMode.play : AppMode.train;
    dispatch(changeMode(mode));
    dispatch(resetGame());
  };

  return (
    <label htmlFor="toggle-switch" className="switch">
      <input onChange={inputHandler} id="toggle-switch" className="switch__input" type="checkbox" />
      <span className="switch__slider" />
    </label>
  );
}

export default ToggleSwitch;
