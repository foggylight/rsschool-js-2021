import { Pool } from 'pg';

const pool = new Pool({
  user: 'sasha',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  database: 'kids_test',
});

export default pool;
