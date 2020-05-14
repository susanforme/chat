import express from 'express';
import error from './error';
import user from './user';
import upload from './upload';
import chat from './chat';
import commodity from './commodity';
import manage from './manage';

const router = express.Router();

//user所有路由
router.use('/user', user);

//上传
router.use('/upload', upload);

//聊天模块
router.use('/chat', chat);

//商品
router.use('/commodity', commodity);

//后台相关api
router.use('/manage', manage);

//注意二级目录放在一级的前面
//注意错误处理一定要放在最后
router.use(error);
export default router;
