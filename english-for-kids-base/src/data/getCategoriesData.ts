import categoriesData from './categories.json';
import { ICategory } from '../models/data';

const getCategoriesData = (): ICategory[] => JSON.parse(JSON.stringify(categoriesData));

export default getCategoriesData;
