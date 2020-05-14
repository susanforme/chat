import express from 'express';
import { queryByIdGetBalance, updateBalanceById } from '@/controllers/user';

const router = express.Router();

router.get('/balance/:id', (req, res) => {
  const id = req.params.id;
  queryByIdGetBalance(id)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(500).send({ status: 0, data: { msg: err.message } })
    );
});

router.post('/balance', (req, res) => {
  const { userId, amount } = req.body;
  if (!(userId && amount)) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  updateBalanceById(userId, amount)
    .then(() => res.send({ status: 1 }))
    .catch((err) =>
      res.status(500).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;
