import express from 'express';
import { insertOrder } from '@/controllers/order';
import { updateCommoidtySaleStatus } from '@/controllers/commodity';

const router = express.Router();

router.post('/order', (req, res) => {
  const { commodityId, receive, buyerId, sellerId, evaluate } = req.body;
  if (!(commodityId && receive && buyerId && sellerId)) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  updateCommoidtySaleStatus(commodityId, (err: any) => {
    if (err) {
      return res.status(500).send(err);
    }
    insertOrder(
      { commodityId, receive, buyerId, sellerId, evaluate },
      (err: any, data: any) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send({ status: 1, data });
      }
    );
  });
});

export default router;
