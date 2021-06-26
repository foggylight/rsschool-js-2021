import React, { ReactElement } from 'react';
import SideMenuButton from './SideMenuButton';

function SideMenu(): ReactElement {
  return (
    <aside className="side-menu">
      <SideMenuButton />
      <ul className="categories closed">
        <li className="categories__item">1</li>
        <li className="categories__item">2</li>
        <li className="categories__item">3</li>
      </ul>
    </aside>
  );
}

export default SideMenu;
