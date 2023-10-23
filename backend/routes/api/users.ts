import express from 'express';
import { Router } from 'express';
import { register } from '../../controllers/authenticate';


const router: Router = Router();
router.post('/register', register);
router.get('/test', (req: express.Request, res: express.Response) => {
  return res.json("this")
})





export default router;
