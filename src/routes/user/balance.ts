import express from 'express';
import { queryByIdGetBalance, updateBalanceById } from '@/controllers/user';

const router = express.Router();

router.get('/balance/:id', (req, res) => {
  const id = req.params.id;
  queryByIdGetBalance(id, (err: any, data: any) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ status: 1, data });
  });
});

router.post('/balance', (req, res) => {
  const { userId, amount } = req.body;
  if (!(userId && amount)) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  updateBalanceById(userId, amount, (err: any, data: any) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ status: 1, data: { msg: '成功' } });
  });
});

export default router;
