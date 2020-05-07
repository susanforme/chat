import express from 'express';
import MD5 from 'crypto-js/md5';
import constant from '../../constant';
import { findByNameUser } from '../../api/user';

const router = express.Router();

router.post('/login', (req, res) => {
  const { password, userName } = req.body;
  const body = {
    userName,
    password: MD5(password + constant.SECRET_USER_STRING).toString(),
  };
  findByNameUser(body, (err: any, data: any) => {
    if (err) {
      return res.status(500).send({ status: 0, msg: '服务器错误请稍后再试' });
    }
    if (data) {
      if (req.session) {
        //设置session,在权限鉴定的时候通过这个判断是否登录,在get的同时
        req.session.userName = data.userName;
      }
      return res.send({ status: 1, data });
    }
    return res.send({ status: 0, msg: '账号或者密码错误' });
  });
});

export default router;
