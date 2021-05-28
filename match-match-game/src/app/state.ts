import { StateObj } from './app.api';

const state: StateObj = {
  router: {
    routes: [],
    root: '/',
    currentRoute: '/',
  },
  user: {
    name: null,
    email: null,
  },
  bestPlayers: [
    {
      name: 'Sasha',
      email: 'default@gmail.com',
      score: 456,
    },
  ],
  settings: {
    cardsType: null,
    difficulty: null,
  },
  game: {
    time: null,
    mistakes: null,
    comparisons: null,
  },
};

export default state;
