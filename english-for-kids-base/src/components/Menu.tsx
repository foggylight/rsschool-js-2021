import React, { ReactElement, useState } from 'react';
import { NavLink } from 'react-router-dom';

import getCategoriesData from '../data/getCategoriesData';
import { Routes } from '../models/app';

function Menu(): ReactElement {
  const [isOpen, changeState] = useState(false);

  const menuHandler = () => {
    changeState(() => !isOpen);
  };

  const categories = getCategoriesData().map(category => (
    <li key={category.id} className="categories__item">
      <NavLink to={`/${category.name.toLowerCase()}`}>{category.name}</NavLink>
    </li>
  ));

  const cover = <div onClick={menuHandler} className="cover" aria-hidden="true" />;

  return (
    <>
      <button
        onClick={menuHandler}
        type="submit"
        className={`menu-btn_${isOpen ? 'opened' : 'closed'}`}
      >
        <span className="line" />
        <span className="line" />
        <span className="line" />
      </button>
      <nav className="menu">
        <ul className={`categories ${isOpen ? 'opened' : 'closed'}`}>
          <NavLink to={Routes.statistics} className="categories__item main-nav-item">
            Statistics
          </NavLink>
          {categories}
        </ul>
      </nav>
      {isOpen ? cover : null}
    </>
  );
}

export default Menu;
