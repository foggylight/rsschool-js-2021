import { Request, Response } from 'express';

import db from '../db/db';

export const createCategory = async (req: Request, res: Response) => {
  const { name, image } = req.body;
  const newCategory = await db.query(
    'INSERT INTO category (name, image) values ($1, $2) RETURNING *',
    [name, image],
  );
  res.json(newCategory.rows[0]);
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await db.query('SELECT * FROM category');
  res.json(categories.rows);
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await db.query('SELECT * FROM category where id = $1', [id]);
  res.json(category.rows[0]);
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id, name, image } = req.body;
  const category = await db.query(
    'UPDATE category set name = $1, image = $2 where id = $3 RETURNING *',
    [name, image, id],
  );
  res.json(category.rows[0]);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await db.query('DELETE FROM category where id = $1', [id]);
  res.json(category.rows[0]);
};
