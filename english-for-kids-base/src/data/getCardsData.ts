import cardsData from './cards.json';
import { Card } from '../models/data';

const getCardsData = (): Card[] => JSON.parse(JSON.stringify(cardsData));

export default getCardsData;
