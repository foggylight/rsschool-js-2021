import React, { ReactElement, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  useParams,
} from 'react-router-dom';

import getCategoriesData from '../../data/getCategoriesData';
import { Routes, SideMenuState } from '../../models/app';

function SideMenu(): ReactElement {
  const [state, changeState] = useState(SideMenuState.closed);

  const menuHandler = () => {
    changeState(() =>
      state === SideMenuState.opened ? SideMenuState.closed : SideMenuState.opened,
    );
  };

  const categories = getCategoriesData().map(category => (
    <li key={category.id}>
      <NavLink to={Routes.categories} className="categories__item">
        {category.name}
      </NavLink>
    </li>
  ));

  const cover = <div onClick={menuHandler} className="cover" aria-hidden="true" />;

  return (
    <>
      <aside className="side-menu">
        <button onClick={menuHandler} type="submit" className={`side-menu__btn_${state}`}>
          <span className="line" />
          <span className="line" />
          <span className="line" />
        </button>
        <ul className={`categories ${state}`}>
          <NavLink to={Routes.statistics} className="categories__item nav-NavLink">
            Statistics
          </NavLink>
          {categories}
        </ul>
      </aside>
      {state === SideMenuState.opened ? cover : null}
    </>
  );
}

export default SideMenu;
