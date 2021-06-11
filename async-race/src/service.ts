import { ICar, IWinner, PageType } from './models';

const URL = 'http://127.0.0.1:3000';

const paths = {
  garage: {
    path: '/garage',
    limit: 7,
  },
  winners: {
    path: '/winners',
    limit: 10,
  },
};

export const getItemsCount = async (pathName: PageType): Promise<number> => {
  const response = await fetch(
    `${URL}${paths[pathName].path}?_limit=${paths[pathName].limit}`,
  );
  const res = response.headers.get('X-Total-Count');
  return res ? +res : 0;
};

export const getCars = async (page: number): Promise<ICar[]> => {
  const response = await fetch(
    `${URL}${paths.garage.path}?_page=${page}&_limit=${paths.garage.limit}`,
  );
  const data = await response.json();
  return data;
};

export const getCar = async (id: number): Promise<ICar> => {
  const response = await fetch(`${URL}${paths.garage.path}/${id}`);
  const data = await response.json();
  return data;
};

export const getWinners = async (): Promise<IWinner[]> => {
  const response = await fetch(
    `${URL}${paths.winners.path}?_limit=${paths.winners.limit}`,
  );
  const data = await response.json();
  return data;
};
