import express from 'express';
import kind from './kind';

const router = express.Router();

//分类
router.use(kind);

export default router;
