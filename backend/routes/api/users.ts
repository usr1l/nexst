import { Request, Response, Router } from 'express';
import { register, login } from '../../controllers/authenticate';
const passport = require('passport')

const router: Router = Router();

router.post('/register', register);

router.post('/login', login);

router.get('/current', passport.authenticate('jwt', { session: false }), (req: any, res: Response) => {
  if (req.user) return res.json({
    id: req.user._id,
    username: req.user.username
  });
  else return res.json({
    "err": "No user found"
  });
});


export default router;
