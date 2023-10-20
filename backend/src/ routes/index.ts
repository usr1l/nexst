import express, { Router } from 'express';
import apiRouter from './api';

const router: Router = Router();

router.use('/api', apiRouter);
