import Router from 'express-promise-router';
import { loginUser, registerUser, verifyUser } from '../controllers/user.controller';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify', verifyUser);

export default router;
