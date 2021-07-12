import { ICard } from '../models/data';
import { API_URL } from '../utils';

export const getCardsData = async (): Promise<ICard[]> => {
  const response = await fetch(`${API_URL}card`);
  const data = await response.json();
  return data;
};

export const getCardsByCategory = async (categoryId: number): Promise<ICard[]> => {
  const response = await fetch(`${API_URL}card?id=${categoryId}`);
  const data = await response.json();
  return data;
};

export default getCardsData;
