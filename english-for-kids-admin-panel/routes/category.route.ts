import Router from 'express-promise-router';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/category.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category API
 * /api/category:
 *   post:
 *     tags: [Category]
 *     summary: Create category
 *     parameters:
 *      - name: name
 *        description: Category name
 *        required: true
 *        type: string
 *      - image: image
 *        description: Category image
 *        required: true
 *        type: string
 *     responses:
 *       '200':
 *         description: New category added successfully
 */

/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category API
 * /api/category:
 *   get:
 *     tags: [Category]
 *     summary: Get all categories
 *     responses:
 *       '200':
 *         description: Successful operation
 */

/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category API
 * /api/category/{categoryId}:
 *   get:
 *     tags: [Category]
 *     summary: Get category
 *     parameters:
 *       - name: "categoryId"
 *         in: "path"
 *         description: ID of category to return
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
 *  name: Category
 *  description: Category API
 * /api/category:
 *   put:
 *     tags: [Category]
 *     summary: Change category
 *     parameters:
 *      - name: name
 *        description: Category name
 *        required: true
 *        type: string
 *      - image: image
 *        description: Category image
 *        required: true
 *        type: string
 *     responses:
 *       '200':
 *         description: Category changed successfully
 */

/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category API
 * /api/category/{categoryId}:
 *   delete:
 *     tags: [Category]
 *     summary: Delete category
 *     parameters:
 *       - name: "categoryId"
 *         in: "path"
 *         description: ID of category to delete
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       '200':
 *         description: Successful operation
 */

router.post('/category', createCategory);
router.get('/category', getCategories);
router.get('/category/:id', getCategory);
router.put('/category', updateCategory);
router.delete('/category/:id', deleteCategory);

export default router;
