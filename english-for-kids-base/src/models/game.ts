export interface ICardAudio {
  id: number;
  audio: string;
}

export interface IStar {
  id: number;
  isCorrect: boolean;
}

export enum SortType {
  default,
  category = 'category',
  word = 'word',
  translation = 'translation',
  clicks = 'clicks',
  rightGuesses = 'rightGuesses',
  mistakes = 'mistakes',
  percentage = 'percentage',
}

export enum SortDirection {
  ASC = 1,
  DESC = 0,
}
