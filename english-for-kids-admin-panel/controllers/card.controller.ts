import { Request, Response } from 'express';

import db from '../db/db';

export const createCard = async (req: Request, res: Response) => {
  const { word, translation, audio, image, categoryId } = req.body;
  try {
    const newCard = await db.query(
      `INSERT INTO card (word, translation, audio, image, category_id)
      values ($1, $2, $3, $4, $5) RETURNING *`,
      [word, translation, audio, image, categoryId],
    );
    res.json(newCard.rows[0]);
  } catch (err) {
    console.log(err);
  }
};

export const getCards = async (req: Request, res: Response) => {
  const { id } = req.query;
  if (id) {
    const cards = await db.query('SELECT * FROM card where category_id = $1', [id]);
    res.json(cards.rows);
  } else {
    try {
      const cards = await db.query('SELECT * FROM card');
      res.json(cards.rows);
    } catch (err) {
      console.log(err);
    }
  }
};

export const getCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await db.query('SELECT * FROM card where id = $1', [id]);
  res.json(user.rows[0]);
};

export const updateCard = async (req: Request, res: Response) => {
  const { id, word, translation, audio, image, categoryId } = req.body;
  const card = await db.query(
    `UPDATE card set word = $1, translation = $2, audio = $3, image = $4,
    category_id = $5 where id = $6 RETURNING *`,
    [word, translation, audio, image, categoryId, id],
  );
  res.json(card.rows[0]);
};

export const deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const card = await db.query('DELETE FROM card where id = $1', [id]);
  res.json(card.rows[0]);
};
