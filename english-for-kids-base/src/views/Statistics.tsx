import React, { ReactElement } from 'react';
import getCardsData from '../data/getCardsData';
import getCategoriesData from '../data/getCategoriesData';

function Statistics(): ReactElement {
  const categoryData = getCategoriesData();
  const cardsData = getCardsData();

  const headers = [
    { id: 1, name: 'Category' },
    { id: 2, name: 'Word' },
    { id: 3, name: 'Translation' },
    { id: 4, name: 'Train clicks' },
    { id: 5, name: 'Correct guesses' },
    { id: 6, name: 'Mistakes' },
    { id: 7, name: '%' },
  ].map(header => (
    <td key={header.id} className="stat-table__h-data">
      {header.name}
    </td>
  ));

  const tableData = cardsData.map(card => {
    const category = categoryData.find(data => data.id === card.categoryId)?.name;
    return (
      <tr key={card.id}>
        <td className="stat-table__data">{category}</td>
        <td className="stat-table__data">{card.word}</td>
        <td className="stat-table__data">{card.translation}</td>
        <td className="stat-table__data">clicks</td>
        <td className="stat-table__data">correct</td>
        <td className="stat-table__data">mistakes</td>
        <td className="stat-table__data">%</td>
      </tr>
    );
  });
  return (
    <main className="main-container">
      <div className="stat-header">
        <h2 className="stat-header__heading">Game statistic</h2>
      </div>
      <table className="stat-table">
        <thead className="stat-table__head">
          <tr>{headers}</tr>
        </thead>
        <tbody className="stat-table__body">{tableData}</tbody>
      </table>
    </main>
  );
}

export default Statistics;
