import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import CategoryCard from '../components/CategoryCard';
import getCategoriesData from '../data/getCategoriesData';
import { AppMode, IState } from '../models/app';

function Main(): ReactElement {
  const mode = useSelector((state: IState) => state.mode.mode);

  const cards = getCategoriesData().map(category => (
    <CategoryCard key={category.id} id={category.id} image={category.image} name={category.name} />
  ));

  return (
    <main className="cards-container">
      <p className="category-text">
        Choose category to {mode === AppMode.play ? 'play' : 'train'}:
      </p>
      <div className="cards-field category-field">{cards}</div>
    </main>
  );
}

export default Main;
