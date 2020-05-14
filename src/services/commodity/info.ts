import express from 'express';
import { insertCommodity, queryCommodity } from '@/controllers/commodity';

const router = express.Router();

//插入商品信息
router.post('/info', (req, res) => {
  const body = req.body;
  insertCommodity(body, (err: any, data: any) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(data);
  });
});

//请求商品信息
router.get('/info/:id', (req, res) => {
  const id = req.params.id;
  if (id) {
    return queryCommodity(id, (err: any, data: any) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(data);
    });
  }
  res.status(400).send({ status: 0, data: { msg: '参数错误' } });
});

export default router;
