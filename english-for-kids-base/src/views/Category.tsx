import React, { ReactElement } from 'react';

import Card from '../components/Card';
import getCardsData from '../data/getCardsData';
import { IPropsCategory } from '../models/props';

function Category({ id, name }: IPropsCategory): ReactElement {
  const cards = getCardsData()
    .filter(card => card.categoryId === id)
    .map(card => (
      <Card
        key={card.id}
        image={card.image}
        audio={card.audio}
        word={card.word}
        translation={card.translation}
      />
    ));

  return (
    <main className="cards-container">
      <h2 className="category-name">{name}</h2>
      <div className="cards-field">{cards}</div>
    </main>
  );
}

export default Category;
