import Router from 'express-promise-router';
import { loginUser, registerUser, verifyUser } from '../controllers/user.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User API
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - password
 *      properties:
 *        id:
 *          type: number
 *          description: The auto-generated id of the user
 *        name:
 *          type: string
 *          description: The user login
 *        password:
 *          type: string
 *          description: The user password
 *      example:
 *        id: 1
 *        name: admin
 *        password: admin
 */

/**
 * @swagger
 *   /auth/register:
 *     post:
 *       tags: [User]
 *       summary: Register new admin
 *       parameters:
 *        - name: name
 *          description: Admin login
 *          required: true
 *          type: string
 *        - name: password
 *          description: Admin password
 *          required: true
 *          type: string
 *       responses:
 *         '200':
 *           description: Successfully created admin
 *         '401':
 *           description: Admin with that name already exists
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [User]
 *     summary: Login as admin
 *     parameters:
 *      - name: name
 *        description: Admin login
 *        required: true
 *        type: string
 *      - name: password
 *        description: Admin password
 *        required: true
 *        type: string
 *     responses:
 *       '200':
 *         description: Successfully login
 *       '401':
 *         description: There is no such user in database or Password is incorrect
 */

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     tags: [User]
 *     summary: Verifies token
 *     responses:
 *       '200':
 *        description: Token is verified
 *       '403':
 *        description: Admin is not authorize
 */

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify', verifyUser);

export default router;
