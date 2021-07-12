import { ICategory } from '../models/data';
import { API_URL } from '../utils';

const getCategoriesData = async (): Promise<ICategory[]> => {
  const response = await fetch(`${API_URL}category`);
  const data = await response.json();
  return data;
};

export default getCategoriesData;
