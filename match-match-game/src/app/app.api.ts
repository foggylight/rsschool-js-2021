export interface Component {
  render(): void;
}

export interface View {
  path: string;
  init(): void;
}

export interface StateObj {
  router: {
    routes: [{ path: string; view: View }?];
    root: string;
    currentRoute: string;
  };
  user: {
    name: string | null;
    email: string | null;
  };
  bestPlayers: [{ name: string; email: string; score: number }?];
  settings: {
    cards: string | null;
    difficulty: string | null;
  };
}
