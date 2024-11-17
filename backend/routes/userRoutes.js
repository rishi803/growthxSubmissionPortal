import { Router } from 'express';
const router = Router();
import { register, login, getAdmins } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

router.post('/register', register);
router.post('/login', login);
router.get('/admins', auth, getAdmins);

export default router;
