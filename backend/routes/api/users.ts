import { Router } from 'express';
import { register, login, currAuth } from '../../controllers/authenticate';

const router: Router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/current', currAuth)

export default router;
