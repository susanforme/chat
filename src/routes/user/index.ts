import login from './login';
import register from './register';
import profile from './profile';
import check from './authority';
import express from 'express';
import captcha from './captcha';

const router = express.Router();
//登录
router.use(login);

//注册
router.use(register);

//查询单个用户的个人页面的
router.use(profile);

//cookie头
router.use(check);

//验证码处理
router.use(captcha);

export default router;
