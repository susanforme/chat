import express from 'express';
import kind from './kind';
import comment from './comment';
import info from './info';

const router = express.Router();

//分类
router.use(kind);

//评论
router.use(comment);

//信息
router.use(info);

export default router;
