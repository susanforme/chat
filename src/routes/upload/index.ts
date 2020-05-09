import express from 'express';
import img from './img';

const router = express.Router();

router.use('/upload', img);

export default router;
