import express from 'express';
import kind from './kind';
import register from './register';
import login from './login';
import { queryAdminByUserName } from '@/controllers/admin';

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
          } 在${new Date().toLocaleString()}登录并请求了${req.url}`
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

export default router;
