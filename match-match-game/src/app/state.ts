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
    cards: null,
    difficulty: null,
  },
};

export default state;
