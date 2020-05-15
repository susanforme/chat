import express from 'express';
import { queryAdminAccount } from '@/controllers/admin';

const router = express.Router();

router.post('/login', (req, res) => {
  const body = req.body;
  const { userName, token, password } = body;
  if (!(userName && token && password)) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  queryAdminAccount({ userName, token, password })
    .then((data) => {
      (req.session as Express.Session).userName = userName;
      res.send({ status: 1, data });
    })
    .catch((err) =>
      res.status(500).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;
