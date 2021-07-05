import { AppMode } from '../models/app';

export const CHANGE_MODE = 'CHANGE_MODE';

interface IModeAction {
  type: typeof CHANGE_MODE;
  mode: AppMode;
}

export type ActionType = IModeAction;

export const changeMode = (mode: AppMode): IModeAction => {
  return {
    type: CHANGE_MODE,
    mode,
  };
};
