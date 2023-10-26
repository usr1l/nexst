import { Router, Request, Response } from 'express';
import { register, login, currUser } from '../../controllers/authenticate';
import passport from 'passport';

const router: Router = Router();

router.post('/register', register);

router.post('/login', login);

router.get('/current', passport.authenticate('jwt', { session: false }), currUser);

export default router;
