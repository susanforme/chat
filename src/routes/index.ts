import express from 'express';
import captcha from './captcha';
import error from './error';
import home from './home';
import login from './user/login';
import register from './user/register';
import profile from './user/profile';

const router = express.Router();

//验证码处理
router.use(captcha);

//home
router.use(home);

//登录
router.use(login);

//注册
router.use(register);

//查询单个用户的个人页面的
router.use(profile);

//注意二级目录放在一级的前面
//注意错误处理一定要放在最后
router.use(error);
export default router;
