import express from 'express';
import { queryOrderBySellId, sellerShipped } from '@/controllers/order';

const router = express.Router();

router.get('/seller/:id', (req, res) => {
  const sellerId = req.params.id;
  queryOrderBySellId(sellerId)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

router.put('/seller/delivery', (req, res) => {
  const { orderId, userId }: DeliveryBody = req.body;
  if (!(orderId && userId)) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  sellerShipped(orderId, userId)
    .then(() => res.send({ status: 1, data: { msg: '成功' } }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;

interface DeliveryBody {
  orderId: string | undefined;
  userId: string | undefined;
}
