import express from 'express';
import MD5 from 'crypto-js/md5';
import constant from '../../constant';
import { findByNameUser } from '../../api/user';

const router = express.Router();

router.post('/login', (req, res) => {
  const { password } = req.body;
  const body = {
    ...req.body,
    password: MD5(password + constant.SECRET_USER_STRING).toString(),
  };
  findByNameUser(body, (err: any, data: Document | null) => {
    if (err) {
      console.log(err);
      return res.send({ status: 0, msg: '服务器错误请稍后再试' });
    }
    return res.send(data);
  });
});

export default router;
