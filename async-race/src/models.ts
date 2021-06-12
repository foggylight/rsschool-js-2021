export interface IPage {
  path: string;
  render(): void;
  delete(): void;
}

export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export enum PageType {
  garage = 'garage',
  winners = 'winners',
  default = 'garage',
}
