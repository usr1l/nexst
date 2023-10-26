import express, { Router } from "express";
import UserRouter from './users';

const router: Router = Router();

router.use('/users', UserRouter);

export default router;
