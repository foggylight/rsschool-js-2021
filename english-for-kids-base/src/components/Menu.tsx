import React, { ReactElement, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import getCategoriesData from '../data/getCategoriesData';
import { Routes } from '../models/app';
import { ICategory } from '../models/data';
import ModalBox from './ModalBox';

const Menu = (): ReactElement => {
  const [isOpen, changeState] = useState(false);
  const [isModalOpen, changeModalState] = useState(false);
  const [categoriesData, updateData] = useState((): ICategory[] => []);

  const menuHandler = () => {
    changeState(!isOpen);
  };

  const modalHandler = () => {
    changeModalState(!isModalOpen);
  };

  useEffect(() => {
    getCategoriesData().then(data => updateData(data));
  }, []);

  const categories = categoriesData.map(category => (
    <li key={category.id} className="categories__item">
      <NavLink onClick={menuHandler} to={`/${category.id}`}>
        {category.name}
      </NavLink>
    </li>
  ));

  const cover = (
    <div
      onClick={isModalOpen ? modalHandler : menuHandler}
      className={`cover ${isModalOpen ? 'modal-cover' : ''}`}
      aria-hidden="true"
    />
  );

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
        <div className={`categories ${isOpen ? 'opened' : 'closed'}`}>
          <NavLink
            onClick={menuHandler}
            exact
            to={Routes.main}
            className="categories__item main-nav-item"
          >
            Main
          </NavLink>
          <NavLink
            onClick={menuHandler}
            to={Routes.statistics}
            className="categories__item main-nav-item"
          >
            Statistics
          </NavLink>
          <ul>{categories}</ul>
          <button onClick={modalHandler} className="btn" type="button">
            Log in
          </button>
        </div>
      </nav>
      {isModalOpen ? <ModalBox closeHandler={modalHandler} /> : null}
      {isOpen ? cover : null}
    </>
  );
};

export default Menu;
