export interface Component {
  node: HTMLElement;
  render(): void;
}

export interface View {
  node: HTMLElement;
  path: string;
  init(): void;
}

export interface StateObj {
  router: {
    routes: [{ path: string; view: View }?];
    root: string;
    currentRoute: string;
  };
  form: {
    state: 'valid' | 'invalid';
    data: {
      firstName: string | null;
      lastName: string | null;
      email: string | null;
    };
  };
  user: {
    name: string | null;
    email: string | null;
    imageSrc: string;
  };
  bestPlayers: { name: string; email: string; score: number }[];
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
