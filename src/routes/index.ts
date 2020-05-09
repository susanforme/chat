import express from 'express';
import error from './error';
import user from './user';
import upload from './upload';
import render from './render';

const router = express.Router();

//渲染静态页面
router.use(render);

//user所有路由
router.use('/user/', user);

//上传
router.use('/upload', upload);

//注意二级目录放在一级的前面
//注意错误处理一定要放在最后
router.use(error);
export default router;
