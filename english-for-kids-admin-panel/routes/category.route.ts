import Router from 'express-promise-router';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/category.controller';

const router = Router();

router.post('/category', createCategory);
router.get('/category', getCategories);
router.get('/category/:id', getCategory);
router.put('/category', updateCategory);
router.delete('/category/:id', deleteCategory);

export default router;
