import { DataBase } from './db';

export interface Component {
  node: HTMLElement;
  render(): void;
}

export interface Page {
  node: HTMLElement;
  db: DataBase;
}

export interface View {
  node: HTMLElement;
  path: string;
  render(): void;
}

export interface StateObj {
  router: {
    routes: {
      path: string;
      view: View;
    }[];
    currentRoute: string;
  };
  user: {
    name: string | null;
    email: string | null;
    imageSrc: string;
  };
  bestPlayers: {
    name: string;
    email: string;
    score: number;
    avatar: string;
  }[];
  settings: {
    cardsType: string | null;
    difficulty: string | null;
  };
  game: {
    time: number;
    mistakes: number;
    comparisons: number;
    matches: number;
    score: number | null;
  };
}
