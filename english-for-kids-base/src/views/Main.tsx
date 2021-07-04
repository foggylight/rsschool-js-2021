import React, { ReactElement } from 'react';

import CategoryCard from '../components/CategoryCard';
import getCategoriesData from '../data/getCategoriesData';

function Main(): ReactElement {
  const cards = getCategoriesData().map(category => (
    <CategoryCard key={category.id} image={category.image} name={category.name} />
  ));

  return (
    <main className="cards-container">
      <p className="category-text">Choose category to train/play:</p>
      <div className="cards-field category-field">{cards}</div>
    </main>
  );
}

export default Main;
