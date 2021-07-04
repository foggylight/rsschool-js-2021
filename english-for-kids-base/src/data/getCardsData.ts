import cardsData from './cards.json';
import { ICard } from '../models/data';

const getCardsData = (): ICard[] => JSON.parse(JSON.stringify(cardsData));

export default getCardsData;
