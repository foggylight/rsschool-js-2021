import { AppMode, IModeState } from '../models/app';
import { ActionType, CHANGE_AUTH_STATE, CHANGE_MODE } from './actions';

const initialState = {
  mode: AppMode.train,
  isAuth: false,
};

const modeReducer = (state = initialState, action: ActionType): IModeState => {
  const newState = state;
  switch (action.type) {
    case CHANGE_MODE:
      newState.mode = action.mode;
      return newState;
    case CHANGE_AUTH_STATE:
      newState.isAuth = action.isAuth;
      console.log(newState);
      return newState;
    default:
      return state;
  }
};

export default modeReducer;
