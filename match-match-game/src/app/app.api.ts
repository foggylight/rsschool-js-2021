export interface Component {
  render(): void;
}

export interface StateObj {
  currentView: string;
  routes: [{ path: string; view: HTMLElement }?];
  bestPlayers: [{ name: string; email: string; score: number }?];
}
