import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtGenerator = (user_id: number) => {
  const payload = {
    user: user_id,
  };

  if (!process.env.jwtSecret) {
    return null;
  }
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '1hr' });
};

export default jwtGenerator;
