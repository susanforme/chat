import express from 'express';
import {
  queryOrderByBuyerId,
  buyerReceive,
  evaluateAndUpateStatus,
} from '@/controllers/order';
import { updateBalanceById } from '@/controllers/user';

const router = express.Router();

router.get('/buyer/:id', (req, res) => {
  const buyerId = req.params.id;
  queryOrderByBuyerId(buyerId)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

router.put('/buyer/receipt', (req, res) => {
  const { orderId, userId }: ReceiptBody = req.body;
  if (!(orderId && userId)) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  receiptApiColletions(orderId, userId)
    .then(() => res.send({ status: 1, data: { msg: '成功' } }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

router.post('/buyer/evaluate', (req, res) => {
  const { orderId, evaluate, userId } = req.body;
  if (!(orderId && userId)) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  evaluateAndUpateStatus(orderId, userId, evaluate)
    .then(() => res.send({ status: 1, data: { msg: '成功' } }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;

async function receiptApiColletions(orderId: string, userId: string) {
  const data = await buyerReceive(orderId, userId);
  updateBalanceById(data.sellerId, data.commodity.price);
}

interface ReceiptBody {
  orderId: string | undefined;
  userId: string | undefined;
}
