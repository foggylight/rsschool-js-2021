import React, { ReactElement } from 'react';
import getCardsData from '../data/getCardsData';

function Main(): ReactElement {
  const cards = getCardsData().map(card => (
    <img key={card.id} src={`data:image/jpeg;base64,${card.image}`} alt="" />
  ));

  return <main>{cards}</main>;
}

export default Main;
