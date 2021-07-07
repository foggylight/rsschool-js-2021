import { ICard } from './models/data';
import getCardsData from './data/getCardsData';
import { countPercentage } from './utils';

export interface IStorageValue {
  clicks: number;
  rightGuesses: number;
  mistakes: number;
}

export enum StorageValue {
  click = 'clicks',
  rightGuess = 'rightGuesses',
  mistake = 'mistakes',
}

export const generateNewValue = (): IStorageValue => {
  const newValue = {
    clicks: 0,
    rightGuesses: 0,
    mistakes: 0,
  };
  return newValue;
};

const addValue = (currentValue: IStorageValue, valueType: StorageValue): string => {
  let newValue;
  switch (valueType) {
    case StorageValue.click: {
      newValue = { ...currentValue, clicks: currentValue.clicks + 1 };
      break;
    }
    case StorageValue.rightGuess: {
      newValue = { ...currentValue, rightGuesses: currentValue.rightGuesses + 1 };
      break;
    }
    case StorageValue.mistake: {
      newValue = { ...currentValue, mistakes: currentValue.mistakes + 1 };
      break;
    }
    default:
      newValue = { clicks: 0, rightGuesses: 0, mistakes: 0 };
  }

  return JSON.stringify(newValue);
};

export const sendToStorage = (id: string, valueType: StorageValue): void => {
  const localStorageValue = localStorage.getItem(id);
  const currentValue: IStorageValue = localStorageValue
    ? JSON.parse(localStorageValue)
    : generateNewValue();
  localStorage.setItem(id, addValue(currentValue, valueType));
};

export const getValue = (id: number, value: StorageValue): number => {
  const storageData = localStorage.getItem(`${id}`);
  if (!storageData) {
    return 0;
  }
  return JSON.parse(storageData)[value];
};

export const getDifficultWords = (): ICard[] => {
  const keys = Object.keys(localStorage);
  const difficultWordsData: { id: number; percentage: number }[] = keys
    .map(key => ({ id: +key, data: localStorage.getItem(key) }))
    .filter(({ data }) => data)
    .map(({ id, data }) => {
      const storageData: IStorageValue = data ? JSON.parse(data) : null;
      return { id, data: storageData };
    })
    .map(({ id, data }) => {
      const percentage = countPercentage(data.rightGuesses, data.rightGuesses + data.mistakes);
      return { id, percentage };
    })
    .filter(({ percentage }) => percentage < 100 && percentage !== 0)
    .sort((data1, data2) => data1.percentage - data2.percentage);
  difficultWordsData.splice(8);
  const cardsData = getCardsData().filter(data =>
    difficultWordsData.find(({ id }) => data.id === id),
  );
  return cardsData;
};
