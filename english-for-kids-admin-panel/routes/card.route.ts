import Router from 'express-promise-router';
import {
  createCard,
  deleteCard,
  getCards,
  getCard,
  updateCard,
} from '../controllers/card.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Card
 *  description: Card API
 * /api/card:
 *   post:
 *     tags: [Card]
 *     summary: Create card
 *     parameters:
 *      - name: word
 *        description: word in english
 *        required: true
 *        type: string
 *      - name: translation
 *        description: word translation
 *        required: true
 *        type: string
 *      - name: audio
 *        description: word audio
 *        required: true
 *        type: string
 *      - name: image
 *        description: word image
 *        required: true
 *        type: string
 *     responses:
 *       '200':
 *         description: New card added successfully
 */

/**
 * @swagger
 * tags:
 *  name: Card
 *  description: Card API
 * /api/card:
 *   get:
 *     tags: [Card]
 *     summary: Get all cards
 *     responses:
 *       '200':
 *         description: Successful operation
 */

/**
 * @swagger
 * tags:
 *  name: Card
 *  description: Card API
 * /api/card/{cardId}:
 *   get:
 *     tags: [Card]
 *     summary: Get card
 *     parameters:
 *       - name: "cardId"
 *         in: "path"
 *         description: ID of card to return
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       '200':
 *         description: Successful operation
 */

/**
 * @swagger
 * tags:
 *  name: Card
 *  description: Card API
 * /api/card:
 *   put:
 *     tags: [Card]
 *     summary: Change card
 *     parameters:
 *      - name: word
 *        description: word in english
 *        required: true
 *        type: string
 *      - name: translation
 *        description: word translation
 *        required: true
 *        type: string
 *      - name: audio
 *        description: word audio
 *        required: true
 *        type: string
 *      - name: image
 *        description: word image
 *        required: true
 *        type: string
 *     responses:
 *       '200':
 *         description: Card changed successfully
 */

/**
 * @swagger
 * tags:
 *  name: Card
 *  description: Card API
 * /api/card/{cardId}:
 *   delete:
 *     tags: [Card]
 *     summary: Delete card
 *     parameters:
 *       - name: "cardId"
 *         in: "path"
 *         description: ID of card to delete
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       '200':
 *         description: Successful operation
 */

router.post('/card', createCard);
router.get('/card', getCards);
router.get('/card/:id', getCard);
router.put('/card', updateCard);
router.delete('/card/:id', deleteCard);

export default router;
