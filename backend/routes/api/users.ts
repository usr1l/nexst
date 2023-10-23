import express, { Request, Response } from 'express';
import { Router } from 'express';
import { register, login } from '../../controllers/authenticate';

const router: Router = Router();
router.post('/register', register);
router.post('/login', login);

export default router;
