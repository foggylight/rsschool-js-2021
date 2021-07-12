import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CategoryCard from '../components/CategoryCard';
import getCategoriesData from '../data/getCategoriesData';
import { AppMode, IState } from '../models/app';
import { ICategory } from '../models/data';

const Main = (): ReactElement => {
  const mode = useSelector((state: IState) => state.mode.mode);

  const [categoriesData, updateData] = useState((): ICategory[] => []);

  useEffect(() => {
    getCategoriesData().then(data => updateData(data));
  }, []);

  const cards = categoriesData.map(category => (
    <CategoryCard key={category.id} id={category.id} image={category.image} name={category.name} />
  ));

  return (
    <main className="main-container">
      <p className="category-text">
        Choose category to {mode === AppMode.play ? 'play' : 'train'}:
      </p>
      <div className="cards-field categories-field">{cards}</div>
    </main>
  );
};

export default Main;
