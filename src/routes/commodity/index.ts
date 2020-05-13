import express from 'express';
import kind from './kind';
import comment from './comment';
import info from './info';
import order from './order';

const router = express.Router();

//分类
router.use(kind);

//评论
router.use(comment);

//信息
router.use(info);

//订单
router.use(order);

export default router;
