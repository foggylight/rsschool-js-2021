import React, { ReactElement } from 'react';

function ToggleSwitch(): ReactElement {
  return (
    <label htmlFor="toggle-switch" className="switch">
      <input id="toggle-switch" className="switch__input" type="checkbox" />
      <span className="switch__slider" />
    </label>
  );
}

export default ToggleSwitch;
