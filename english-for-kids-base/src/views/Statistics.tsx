import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import getCardsData from '../data/getCardsData';
import getCategoriesData from '../data/getCategoriesData';
import { Routes } from '../models/app';
import { generateNewValue } from '../storage';
import { countPercentage } from '../utils';

function Statistics(): ReactElement {
  const history = useHistory();
  const categoryData = getCategoriesData();
  const cardsData = getCardsData();

  const [, updateStorage] = useState(localStorage.length);

  const headers = [
    { id: 1, name: 'Category' },
    { id: 2, name: 'Word' },
    { id: 3, name: 'Translation' },
    { id: 4, name: 'Train clicks' },
    { id: 5, name: 'Correct guesses' },
    { id: 6, name: 'Mistakes' },
    { id: 7, name: 'Correct / total' },
  ].map(header => (
    <td key={header.id} className="stat-table__h-data">
      {header.name}
    </td>
  ));

  const tableData = cardsData.map(card => {
    const category = categoryData.find(data => data.id === card.categoryId)?.name;
    const storageData = localStorage.getItem(`${card.id}`);
    const { clicks, rightGuesses, mistakes } = storageData
      ? JSON.parse(storageData)
      : generateNewValue();
    const percentage = countPercentage(rightGuesses, rightGuesses + mistakes);
    return (
      <tr key={card.id} className="stat-table__d-row">
        <td className="stat-table__data">{category}</td>
        <td className="stat-table__data">{card.word}</td>
        <td className="stat-table__data">{card.translation}</td>
        <td className="stat-table__data">{clicks}</td>
        <td className="stat-table__data">{rightGuesses}</td>
        <td className="stat-table__data">{mistakes}</td>
        <td className="stat-table__data">{`${percentage || 0}%`}</td>
      </tr>
    );
  });

  const resetStorage = () => {
    localStorage.clear();
    updateStorage(() => localStorage.length);
  };

  const repeatWords = () => {
    history.push(Routes.difficultWords);
  };

  return (
    <main className="main-container">
      <div className="stat-header">
        <h2>Game statistics</h2>
        <div>
          <button className="btn stat-header__btn" onClick={repeatWords} type="button">
            Repeat difficult words
          </button>
          <button className="btn stat-header__btn" onClick={resetStorage} type="button">
            Reset
          </button>
        </div>
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
