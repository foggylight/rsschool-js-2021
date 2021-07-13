import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import db from '../db/db';
import jwtGenerator from '../utils/jwtGenerator';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    const user = await db.query('SELECT * FROM users WHERE user_name = $1', [name]);
    if (user.rows.length > 0) {
      res.status(401).json('User already exist!');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      'INSERT INTO users (user_name, user_password) VALUES ($1, $2) RETURNING *',
      [name, bcryptPassword],
    );

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    const user = await db.query('SELECT * FROM users WHERE user_name = $1', [name]);
    if ((await user).rows.length === 0) {
      res.status(401).send('There is no such user in database');
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

    if (!validPassword) {
      res.status(401).send('Password is incorrect');
    }

    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
  }
};
