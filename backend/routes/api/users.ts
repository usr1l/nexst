import { Router, Request, Response } from 'express';
import { register, login } from '../../controllers/authenticate';
const passport = require('passport')

const router: Router = Router();

router.post('/register', register);

router.post('/login', login);

router.get('/current', passport.authenticate('jwt', { session: false }), (req: any, res) => {
  return;
});


export default router;
