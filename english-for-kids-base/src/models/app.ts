export enum Routes {
  main = '/',
  categories = '/category',
  statistics = '/statistics',
}

export enum AppMode {
  play = 'play',
  train = 'train',
}

export interface IModeState {
  mode: AppMode;
}
