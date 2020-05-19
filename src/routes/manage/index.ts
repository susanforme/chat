import express from 'express';
import kind from './kind';
import register from './register';
import login from './login';
import notice from './notice';
import { queryAdminByUserName } from '@/controllers/admin';
import comment from './comment';
import commodity from './commodity';
import room from './room';
import record from './record';
import user from './user';
import carousel from './carousel';

const router = express.Router();

//敏感操作鉴权
router.use((req, res, next) => {
  const urls = ['/login', '/register'];
  if (!urls.includes(req.url)) {
    if (!req.session?.userName) {
      return res
        .status(403)
        .send({ status: 0, data: { msg: '无权限请登录后再尝试' } });
    }
    return queryAdminByUserName(req.session.userName)
      .then(() => {
        console.log(
          `管理员${
            req.session?.userName
          } 在${new Date().toLocaleString()}请求了${req.url},操作是${
            req.method
          },请求体是${JSON.stringify(req.body || {})}`
        );
        next();
      })
      .catch(() => {
        return res
          .status(403)
          .send({ status: 0, data: { msg: '无权限请登录后再尝试' } });
      });
  }
  next();
});

//分类
router.use(kind);

//注册管理员
router.use(register);

//登录
router.use(login);

//公告
router.use(notice);

//评论
router.use(comment);

//商品
router.use(commodity);

//房间
router.use(room);

//聊天记录
router.use(record);

//用户
router.use(user);

//轮播
router.use(carousel);

export default router;
