import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../models/app';
import Menu from './Menu';
import ToggleSwitch from './ToggleSwitch';

const Header = (): ReactElement => (
  <header className="header">
    <Menu />
    <Link className="header-link" to={Routes.main}>
      <h1 className="main-heading">English for kids</h1>
    </Link>
    <ToggleSwitch />
  </header>
);

export default Header;
