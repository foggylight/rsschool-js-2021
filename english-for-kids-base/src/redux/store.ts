import { createStore } from 'redux';
import reducer from './modeReducer';

const store = createStore(reducer);

export default store;
