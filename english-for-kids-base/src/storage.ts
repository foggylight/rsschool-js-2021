export interface IStorageValue {
  clicks: number;
  rightGuesses: number;
  mistakes: number;
}

export enum StorageValue {
  click = 'click',
  rightGuess = 'rightGuess',
  mistake = 'mistake',
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
