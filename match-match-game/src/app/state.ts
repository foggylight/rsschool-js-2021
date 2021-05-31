import { StateObj } from './app.api';

const state: StateObj = {
  router: {
    routes: [],
    root: '/',
    currentRoute: '/',
  },
  form: {
    state: 'invalid',
    data: {
      firstName: null,
      lastName: null,
      email: null,
    },
  },
  user: {
    name: null,
    email: null,
    imageSrc: '',
  },
  bestPlayers: [
    // {
    //   name: 'Sasha',
    //   email: 'default@gmail.com',
    //   score: 456,
    // },
  ],
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
