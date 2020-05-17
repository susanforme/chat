import express from 'express';
import MD5 from 'crypto-js/md5';
import { findByNameUser } from '@/controllers/user';
import dotenv from 'dotenv';
import path from 'path';

const PATH_ENV =
  dotenv.config({ path: path.join(process.cwd(), '/bin/.env') }).parsed || {};

const router = express.Router();

router.post('/login', (req, res) => {
  const { password, userName } = req.body;
  const body = {
    userName,
    password: MD5(password + PATH_ENV.SECRET_USER_STRING).toString(),
  };
  findByNameUser(body)
    .then((data) => {
      if (data && req.session) {
        //设置session,在权限鉴定的时候通过这个判断是否登录,在get的同时
        req.session.userName = data.userName;
        res.send({ status: 1, data });
      }
    })
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;
