import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { insertAdminAccount } from '@/controllers/admin';

const MY_TOKEN = dotenv.config({ path: path.join(process.cwd(), '/bin/.env') })
  .parsed?.ADMIN_REGISTER_TOKEN;

const router = express.Router();

router.post('/register', (req, res) => {
  const body = req.body;
  const { userName, token, password } = body;
  if (!(userName && token && password)) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  if (token !== MY_TOKEN) {
    return res.status(400).send({ status: 0, data: { msg: '注册口令错误' } });
  }
  insertAdminAccount({ userName, password })
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(500).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;
