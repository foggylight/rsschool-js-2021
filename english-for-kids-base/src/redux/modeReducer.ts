import { AppMode, IModeState } from '../models/app';
import { ActionType, CHANGE_MODE } from './actions';

const initialState = {
  mode: AppMode.train,
};

const modeReducer = (state = initialState, action: ActionType): IModeState => {
  const newState = state;
  switch (action.type) {
    case CHANGE_MODE:
      newState.mode = action.mode;
      return newState;
    default:
      return state;
  }
};

export default modeReducer;
