import express from 'express';
import { findByNameUser } from '@/controllers/user';

const router = express.Router();

router.get('/check', (req, res) => {
  const userName = (req.session as Express.Session).userName;
  if (userName) {
    findByNameUser({ userName }).then((data) => res.send({ status: 1, data }));
  } else {
    res.send({ status: 0, msg: '未登录' });
  }
});

export default router;
