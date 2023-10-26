import { Router, Request, Response } from 'express';
import { register, login, currUser } from '../../controllers/authenticate';
const passport = require('passport')

const router: Router = Router();

router.post('/register', register);

router.post('/login', login);

router.get('/current', passport.authenticate('jwt', { session: false }), (req: any, res) => {
  console.log('REQQQQQQQQQQQQQQQ', req.user?.username)
  return res.json(req);
});


export default router;
