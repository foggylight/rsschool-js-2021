import Router from 'express-promise-router';
import {
  createCard,
  deleteCard,
  getCards,
  getCard,
  updateCard,
} from '../controllers/card.controller';

const router = Router();

router.post('/card', createCard);
router.get('/card', getCards);
router.get('/card/:id', getCard);
router.put('/card', updateCard);
router.delete('/card/:id', deleteCard);

export default router;
