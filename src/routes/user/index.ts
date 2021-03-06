import login from './login';
import register from './register';
import profile from './profile';
import check from './check';
import express from 'express';
import captcha from './captcha';
import location from './location';
import logout from './logout';
import balance from './balance';
import personal from './personal';
import headimg from './headimg';

const router = express.Router();
//登录
router.use(login);

//注册
router.use(register);

//退出
router.use(logout);

//查询单个用户的个人页面的
router.use(profile);

//cookie头
router.use(check);

//验证码处理
router.use(captcha);

//地址
router.use(location);

//余额
router.use(balance);

//个人主页
router.use(personal);

//toux
router.use(headimg);

export default router;
