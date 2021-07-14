import { AppMode } from '../models/app';
import { ICardAudio } from '../models/game';

export const CHANGE_MODE = 'CHANGE_MODE';
export const CHANGE_AUTH_STATE = 'CHANGE_AUTH_STATE';
export const CHANGE_CURRENT_CARD = 'CHANGE_CURRENT_CARD';
export const ADD_CARDS = 'ADD_CARDS';
export const SPLICE_CARDS = 'SPLICE_CARDS';
export const ADD_MISTAKE = 'ADD_MISTAKE';
export const ADD_STAR = 'ADD_STAR';
export const START_GAME = 'START_GAME';
export const END_GAME = 'END_GAME';
export const RESET_GAME = 'RESET_GAME';

interface IModeAction {
  type: typeof CHANGE_MODE;
  mode: AppMode;
}

interface IAuthAction {
  type: typeof CHANGE_AUTH_STATE;
  isAuth: boolean;
}

interface IGameCardAction {
  type: typeof CHANGE_CURRENT_CARD;
  card: ICardAudio;
}

interface IAddCards {
  type: typeof ADD_CARDS;
  cards: ICardAudio[];
}

interface ISpliceCards {
  type: typeof SPLICE_CARDS;
  card: ICardAudio;
}

interface IAddMistake {
  type: typeof ADD_MISTAKE;
}

interface IAddStar {
  type: typeof ADD_STAR;
  isCorrect: boolean;
}

interface IStartGame {
  type: typeof START_GAME;
  isGameStarted: boolean;
}

interface IEndGame {
  type: typeof END_GAME;
  isGameEnded: boolean;
}

interface IResetGame {
  type: typeof RESET_GAME;
}

export type ActionType =
  | IModeAction
  | IAuthAction
  | IGameCardAction
  | IAddCards
  | ISpliceCards
  | IAddMistake
  | IAddStar
  | IStartGame
  | IEndGame
  | IResetGame;

export const changeMode = (mode: AppMode): IModeAction => {
  return {
    type: CHANGE_MODE,
    mode,
  };
};

export const changeAuthState = (isAuth: boolean): IAuthAction => {
  return {
    type: CHANGE_AUTH_STATE,
    isAuth,
  };
};

export const changeCurrentCard = (card: ICardAudio): IGameCardAction => {
  return {
    type: CHANGE_CURRENT_CARD,
    card,
  };
};

export const addCards = (cards: ICardAudio[]): IAddCards => {
  return {
    type: ADD_CARDS,
    cards,
  };
};

export const spliceCards = (card: ICardAudio): ISpliceCards => {
  return {
    type: SPLICE_CARDS,
    card,
  };
};

export const addMistake = (): IAddMistake => {
  return {
    type: ADD_MISTAKE,
  };
};

export const addStar = (isCorrect: boolean): IAddStar => {
  return {
    type: ADD_STAR,
    isCorrect,
  };
};

export const startGame = (isGameStarted: boolean): IStartGame => {
  return {
    type: START_GAME,
    isGameStarted,
  };
};

export const endGame = (isGameEnded: boolean): IEndGame => {
  return {
    type: END_GAME,
    isGameEnded,
  };
};

export const resetGame = (): IResetGame => {
  return {
    type: RESET_GAME,
  };
};
