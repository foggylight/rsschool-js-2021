import { combineReducers, createStore } from 'redux';
import gameReducer from './gameReducer';
import modeReducer from './modeReducer';

const rootReducer = combineReducers({
  mode: modeReducer,
  game: gameReducer,
});

const store = createStore(rootReducer);

export default store;
