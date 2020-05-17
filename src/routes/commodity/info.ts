import express from 'express';
import { insertCommodity, queryCommodity } from '@/controllers/commodity';

const router = express.Router();

//插入商品信息
router.post('/info', (req, res) => {
  const body = req.body;
  insertCommodity(body)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

//请求商品信息
router.get('/info/:id', (req, res) => {
  const id = req.params.id;
  if (id) {
    return queryCommodity(id)
      .then((data) => res.send({ status: 1, data }))
      .catch((err) =>
        res.status(400).send({ status: 0, data: { msg: err.message } })
      );
  }
  res.status(400).send({ status: 0, data: { msg: '参数错误' } });
});

export default router;
