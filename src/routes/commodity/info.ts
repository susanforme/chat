import express from 'express';
import { insertCommodity, queryCommodity } from '@/api/commodity';

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
router.get('/info', (req, res) => {
  const id = req.query.id;
  if (id) {
    return queryCommodity(id as string, (err: any, data: any) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(data);
    });
  }
  res.status(400).send({ status: 0, data: { msg: '参数错误' } });
});

export default router;
