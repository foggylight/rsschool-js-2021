import { StateObj } from './app.api';

const state: StateObj = {
  router: {
    routes: [],
    currentRoute: '/',
  },
  user: {
    name: null,
    email: null,
    imageSrc: '',
  },
  bestPlayers: [],
  settings: {
    cardsType: null,
    difficulty: null,
  },
  game: {
    time: 0,
    mistakes: 0,
    comparisons: 0,
    matches: 0,
    score: 0,
  },
};

export default state;
