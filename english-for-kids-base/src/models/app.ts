import { ICardAudio, IStar } from './game';

export enum Routes {
  main = '/',
  categories = '/category',
  statistics = '/statistics',
  difficultWords = '/difficult-words',
  admin = '/admin',
  adminC = '/admin/categories',
  adminW = '/admin/2/words',
}

export enum AppMode {
  play = 'play',
  train = 'train',
}

export enum AdminCardState {
  edit = 'edit',
  default = 'default',
}

export interface IModeState {
  mode: AppMode;
}

export interface IGameState {
  game: {
    isGameStarted: boolean;
    isGameEnded: boolean;
    currentCard: null | ICardAudio;
    currentCards: ICardAudio[];
    mistakes: number;
    stars: IStar[];
  };
}

export interface IState {
  mode: { mode: AppMode; isAuth: boolean };
  game: IGameState;
}
