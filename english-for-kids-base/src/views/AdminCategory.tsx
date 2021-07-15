import React, { ReactElement, useEffect, useRef, useState } from 'react';
import AdminCard from '../components/AdminCard';
import NewCard from '../components/NewCard';
import { getCardsByCategory } from '../data/getCardsData';
import { ICard } from '../models/data';

import { IPropsCategory } from '../models/props';

const setCardsCount = (screenWidth: number) => {
  if (screenWidth > 1114) {
    return 7;
  }
  if (screenWidth > 854) {
    return 5;
  }
  if (screenWidth > 594) {
    return 3;
  }
  return 1;
};

function AdminCategory({ id, name }: IPropsCategory): ReactElement {
  const [reload, setReload] = useState(false);
  const [screenWidth] = useState(window.screen.width);
  const [cardCount, incrementCount] = useState(setCardsCount(screenWidth));
  const [cardsData, updateData] = useState((): ICard[] => []);
  const [isBottom, setPlacing] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCardsByCategory(id).then(data => updateData(data.splice(0, cardCount)));
  }, []);

  useEffect(() => {
    getCardsByCategory(id).then(data => updateData(data.splice(0, cardCount)));
  }, [cardCount]);

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

  useEffect(() => {
    if (!isBottom) {
      return;
    }
    if (screenWidth > 1114) {
      incrementCount(cardCount + 4);
    } else if (screenWidth > 854) {
      incrementCount(cardCount + 3);
    } else if (screenWidth > 594) {
      incrementCount(cardCount + 2);
    } else {
      incrementCount(cardCount + 1);
    }
  }, [isBottom]);

  useEffect(() => {
    if (reload) {
      getCardsByCategory(id).then(data => updateData(data.splice(0, cardCount)));
      setReload(false);
    }
  }, [reload]);

  const scrollHandler = () => {
    if (!ref.current) {
      return;
    }
    if (ref.current.scrollTop + ref.current.clientHeight >= ref.current.scrollHeight) {
      setPlacing(true);
    } else {
      setPlacing(false);
    }
  };

  return (
    <main onScroll={scrollHandler} ref={ref} className="main-container admin-main-container">
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
