import { ICar, IEngine, IWinner, PageType } from './models';
import { getRandomInt, getRandomColor } from './utils';

const URL = 'http://127.0.0.1:3000';

export const paths = {
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
  const response = await fetch(`${URL}${paths[pathName].path}?_limit=${paths[pathName].limit}`);
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

export const createCar = async (carName: string, carColor: string): Promise<void> => {
  const content = { name: carName, color: carColor };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  };
  await fetch(`${URL}${paths.garage.path}`, options);
};

export const updateCar = async (id: number, carName: string, carColor: string): Promise<void> => {
  const content = { name: carName, color: carColor };
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  };
  await fetch(`${URL}${paths.garage.path}/${id}`, options);
};

export const getWinner = async (id: number): Promise<Response> => {
  const response = await fetch(`${URL}${paths.winners.path}/${id}`);
  return response;
};

const deleteWinner = async (id: number): Promise<void> => {
  const options = {
    method: 'DELETE',
  };
  await fetch(`${URL}${paths.winners.path}/${id}`, options);
};

export const deleteCar = async (id: number): Promise<void> => {
  const options = {
    method: 'DELETE',
  };
  await fetch(`${URL}${paths.garage.path}/${id}`, options);

  if ((await (await getWinner(id)).status) === 200) {
    await deleteWinner(id);
  }
};

export const getWinners = async (
  page: number,
  sortBy: string,
  order: string,
): Promise<IWinner[]> => {
  const sortOptions = `&_sort=${sortBy}&_order=${order}`;
  const response = await fetch(
    `${URL}${paths.winners.path}?_page=${page}&_limit=${paths.winners.limit}${sortOptions}`,
  );
  const data = await response.json();
  return data;
};

export const createWinner = async (id: number, time: number): Promise<void> => {
  const content = { id, wins: 1, time };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  };
  await fetch(`${URL}${paths.winners.path}`, options);
};

export const updateWinner = async (id: number, newTime: number): Promise<void> => {
  const winner: IWinner = await (await getWinner(id)).json();
  const time = winner.time > newTime ? newTime : winner.time;
  const content = { wins: winner.wins + 1, time };
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  };
  await fetch(`${URL}${paths.winners.path}/${id}`, options);
};

export const startEngine = async (id: number): Promise<IEngine> => {
  const data = await (await fetch(`${URL}/engine?id=${id}&status=started`)).json();
  return data;
};

export const stopEngine = async (id: number): Promise<void> => {
  await fetch(`${URL}/engine?id=${id}&status=stopped`);
};

export const driveCar = async (id: number): Promise<number> => {
  const res = await fetch(`${URL}/engine?id=${id}&status=drive`);
  return res.status;
};

const carsBrands = [
  'Audi',
  'BMW',
  'Bentley',
  'Cadillac',
  'Chevrolet',
  'Ford',
  'Honda',
  'Jaguar',
  'Lexus',
  'Mazda',
  'Mercedes',
  'Mitsubishi',
  'Nissan',
  'Porsche',
  'Suzuki',
  'Tesla',
  'Toyota',
  'Volkswagen',
  'Volvo',
  'Lada',
  'GAZ',
];

const carsModels = [
  'Volga',
  'Pobeda',
  'TT',
  '200',
  '850',
  'Eldorado',
  'Coupe de Ville',
  'Camry',
  'Corolla',
  'X5',
  'Captiva',
  'Impala',
  'Camaro',
  'Corvette',
  'Explorer',
  'Fiesta',
  'Focus',
  'Mustang',
  'Civic',
  'Accord',
];

const getRandomName = (): string => {
  const brand = carsBrands[getRandomInt(carsBrands.length - 1)];
  const model = carsModels[getRandomInt(carsModels.length - 1)];
  return `${brand} ${model}`;
};

export const generateCars = async (carsCount: number): Promise<void> => {
  const newCarsRes = new Array(carsCount).fill('car');
  await newCarsRes.map(async () => {
    const res = await createCar(getRandomName(), getRandomColor());
    return res;
  });
  Promise.all(newCarsRes);
};
