import express from 'express';
import kind from './kind';
import comment from './comment';
import info from './info';
import classification from './classification';
import recommend from './recommend';
import search from './search';

const router = express.Router();

//分类
router.use(kind);

//评论
router.use(comment);

//信息
router.use(info);

//根据分类返回商品
router.use(classification);

//推荐
router.use(recommend);

//搜索
router.use(search);

export default router;
