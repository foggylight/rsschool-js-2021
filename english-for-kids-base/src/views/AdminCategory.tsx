import React, { ReactElement, useEffect, useState } from 'react';
import AdminCard from '../components/AdminCard';
import NewCard from '../components/NewCard';
import { getCardsByCategory } from '../data/getCardsData';
import { ICard } from '../models/data';

import { IPropsCategory } from '../models/props';

function AdminCategory({ id, name }: IPropsCategory): ReactElement {
  const [reload, setReload] = useState(false);
  const [cardsData, updateData] = useState((): ICard[] => []);

  useEffect(() => {
    getCardsByCategory(id).then(data => updateData(data));
  }, []);

  useEffect(() => {
    getCardsByCategory(id).then(data => updateData(data));
  }, [reload]);

  const cards = cardsData.map(card => (
    <AdminCard
      setReload={setReload}
      key={card.id}
      id={card.id}
      category_id={id}
      image={card.image}
      audio={card.audio}
      word={card.word}
      translation={card.translation}
    />
  ));

  return (
    <main className="main-container">
      <div className="category-header">
        <h2 className="category-name">{name}</h2>
      </div>
      <div className="cards-field admin-cards-field">
        <NewCard setReload={setReload} category_id={id} />
        {cards}
      </div>
    </main>
  );
}

export default AdminCategory;
