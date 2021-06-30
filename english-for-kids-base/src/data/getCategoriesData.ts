import categoriesData from './categories.json';
import { Category } from '../models/data';

const getCategoriesData = (): Category[] => JSON.parse(JSON.stringify(categoriesData));

export default getCategoriesData;
