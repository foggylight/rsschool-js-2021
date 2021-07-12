import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getCardsData } from '../data/getCardsData';
import getCategoriesData from '../data/getCategoriesData';
import { Routes } from '../models/app';
import { ICard, ICategory } from '../models/data';
import { SortDirection, SortType } from '../models/game';
import { generateNewValue, getValue, StorageValue } from '../storage';
import { countPercentage } from '../utils';

const sortStatistics = async (data: ICard[], type: SortType) => {
  const categoryData = await getCategoriesData();
  switch (type) {
    case SortType.category:
      return data.sort((a, b) => {
        const categoryA = categoryData.find(category => category.id === a.category_id);
        const categoryB = categoryData.find(category => category.id === b.category_id);
        return !categoryA || !categoryB ? 0 : categoryA.name.localeCompare(categoryB.name);
      });
    case SortType.word:
      return data.sort((a, b) => a.word.localeCompare(b.word));
    case SortType.translation:
      return data.sort((a, b) => a.translation.localeCompare(b.translation));
    case SortType.clicks:
      return data.sort(
        (a, b) => getValue(a.id, StorageValue.click) - getValue(b.id, StorageValue.click),
      );
    case SortType.rightGuesses:
      return data.sort(
        (a, b) => getValue(a.id, StorageValue.rightGuess) - getValue(b.id, StorageValue.rightGuess),
      );
    case SortType.mistakes:
      return data.sort(
        (a, b) => getValue(a.id, StorageValue.mistake) - getValue(b.id, StorageValue.mistake),
      );
    case SortType.percentage:
      return data.sort((a, b) => {
        const right1 = getValue(a.id, StorageValue.rightGuess);
        const total1 = right1 + getValue(a.id, StorageValue.mistake);
        const right2 = getValue(b.id, StorageValue.rightGuess);
        const total2 = right2 + getValue(b.id, StorageValue.mistake);
        return countPercentage(right1, total1) - countPercentage(right2, total2);
      });
    default:
      return data;
  }
};

const Statistics = (): ReactElement => {
  const history = useHistory();

  const [cardsData, sortData] = useState((): ICard[] => []);
  const [sortDirection, changeDirection] = useState(SortDirection.ASC);
  const [currentSortType, changeSortType] = useState(SortType.default);
  const [, updateStorage] = useState(localStorage.length);
  const [categoryData, updateData] = useState((): ICategory[] => []);

  useEffect(() => {
    getCardsData().then(data => sortData(data));
  }, []);

  useEffect(() => {
    getCategoriesData().then(data => updateData(data));
  }, []);

  const sortHandler = (type: SortType) => {
    if (currentSortType === type) {
      changeDirection(() => (sortDirection ? SortDirection.DESC : SortDirection.ASC));
      sortData([...cardsData].reverse());
      return;
    }
    changeSortType(type);
    changeDirection(SortDirection.ASC);
  };

  useEffect(() => {
    sortStatistics(cardsData, currentSortType).then(data => sortData([...data]));
  }, [currentSortType]);

  const headers = [
    { id: 1, type: SortType.category, name: 'Category' },
    { id: 2, type: SortType.word, name: 'Word' },
    { id: 3, type: SortType.translation, name: 'Translation' },
    { id: 4, type: SortType.clicks, name: 'Train clicks' },
    { id: 5, type: SortType.rightGuesses, name: 'Correct guesses' },
    { id: 6, type: SortType.mistakes, name: 'Mistakes' },
    { id: 7, type: SortType.percentage, name: 'Correct / total' },
  ].map(header => (
    <td
      key={header.id}
      onClick={() => sortHandler(header.type)}
      aria-hidden="true"
      className={`stat-table__h-data ${currentSortType === header.type ? 'active' : ''} ${
        sortDirection ? 'asc' : 'desc'
      }`}
    >
      {header.name}
    </td>
  ));

  const tableData = cardsData.map(card => {
    const category = categoryData.find(data => data.id === card.category_id)?.name;
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
        <h2 className="stat-header__heading">Game statistics</h2>
        <div>
          <button className="btn stat-header__btn" onClick={repeatWords} type="button">
            Repeat difficult words
          </button>
          <button className="btn stat-header__btn" onClick={resetStorage} type="button">
            Reset
          </button>
        </div>
      </div>
      <div className="stat-scroll">
        <table className="stat-table">
          <thead className="stat-table__head">
            <tr>{headers}</tr>
          </thead>
          <tbody className="stat-table__body">{tableData}</tbody>
        </table>
      </div>
    </main>
  );
};

export default Statistics;
