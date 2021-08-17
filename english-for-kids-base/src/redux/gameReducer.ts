import { IGameState } from '../models/app';
import {
  ActionType,
  ADD_CARDS,
  ADD_MISTAKE,
  ADD_STAR,
  CHANGE_CURRENT_CARD,
  END_GAME,
  RESET_GAME,
  SPLICE_CARDS,
  START_GAME,
} from './actions';

const initialState: IGameState = {
  isGameStarted: false,
  isGameEnded: false,
  currentCard: null,
  currentCards: [],
  mistakes: 0,
  stars: [],
};

const gameReducer = (state = initialState, action: ActionType): IGameState => {
  switch (action.type) {
    case CHANGE_CURRENT_CARD:
      return { ...state, currentCard: action.card };
    case ADD_CARDS:
      return { ...state, currentCards: action.cards };
    case SPLICE_CARDS: {
      const currentIndex = state.currentCards.findIndex(({ id }) => id === action.card.id);
      const newCards = [...state.currentCards];
      newCards.splice(currentIndex, 1);
      return { ...state, currentCards: newCards };
    }
    case ADD_MISTAKE:
      return { ...state, mistakes: state.mistakes + 1 };
    case ADD_STAR: {
      const starsLength = state.stars.length;
      let id;
      if (starsLength === 0) {
        id = 1;
      } else {
        id = state.stars[starsLength - 1].id + 1;
      }
      const star = { id, isCorrect: action.isCorrect };
      const newStars = [...state.stars];
      newStars.push(star);
      return { ...state, stars: newStars };
    }
    case START_GAME:
      return { ...state, isGameStarted: action.isGameStarted };
    case END_GAME:
      return { ...state, isGameEnded: action.isGameEnded };
    case RESET_GAME:
      return initialState;
    default:
      return state;
  }
};

export default gameReducer;
