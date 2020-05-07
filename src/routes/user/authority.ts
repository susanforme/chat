import express from 'express';
import { findByNameUser } from '../../api/user';
const router = express.Router();

router.get('/check', (req, res) => {
  const userName = (req.session as Express.Session).userName;
  if (userName) {
    findByNameUser({ userName }, (err: any, data: any) => {
      if (err) {
        return res.status(500).send({ status: 0, msg: '服务器错误请稍后再试' });
      }
      return res.send({ status: 1, data });
    });
  } else {
    res.send({ status: 0, msg: '未登录' });
  }
});

export default router;
