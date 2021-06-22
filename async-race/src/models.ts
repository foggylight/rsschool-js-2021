export interface IPage {
  path: string;
  hide(): void;
  show(): void;
  render(): void;
}

export interface IGarage {
  node: HTMLElement;
  currentCarId: number | null;
  renderCarsList(): void;
  renderItemsCount(pageName: string): Promise<void>;
  checkCarsListReloadNeed(): Promise<boolean>;
  checkPaginationButtonState(): void;
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

export interface IEngine {
  velocity: number;
  distance: number;
}

export interface IResult {
  id: number;
  time: number;
}

export enum PageType {
  garage = 'garage',
  winners = 'winners',
  default = 'garage',
}

export enum FormType {
  create = 'create',
  update = 'update',
}

export enum CarStatus {
  started = 'started',
  stopped = 'stopped',
  drive = 'drive',
}

export enum SortOrder {
  asc = 'ASC',
  desc = 'DESC',
}
