import express from 'express';
import captcha from './captcha';
import error from './error';
import home from './home';
import user from './user';
import upload from './upload';

const router = express.Router();

//验证码处理
router.use(captcha);

//home
router.use(home);

//user所有路由
router.use(user);

//上传
router.use(upload);

//注意二级目录放在一级的前面
//注意错误处理一定要放在最后
router.use(error);
export default router;
