import express from 'express';
import notice from './notice';
import carousel from './carousel';

const router = express.Router();

//公告
router.use(notice);

//轮播图
router.use(carousel);
export default router;
