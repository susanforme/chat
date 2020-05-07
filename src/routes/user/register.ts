import express from 'express';
import MD5 from 'crypto-js/md5';
import constant from '../../constant';
import { addUser } from '../../api/user';

const router = express.Router();

router.post('/register', (req, res) => {
  const { password, userName } = req.body;
  const body = {
    userName,
    password: MD5(password + constant.SECRET_USER_STRING).toString(),
  };
  addUser(body, (err: any, data: Body) => {
    if (err) {
      if (err.msg) {
        return res.send(err);
      }
      return res.send({ status: 0, msg: '注册失败请重试' });
    }
    const { id, createTime, userName } = data;
    if (req.session) {
      //设置session,在权限鉴定的时候通过这个判断是否登录,在get的同时
      req.session.userName = data.userName;
    }
    res.send({ status: 1, data: { id, createTime, userName } });
  });
});

export default router;

type Body = {
  createTime: string;
  id: string;
  userName: string;
  password: string;
};
