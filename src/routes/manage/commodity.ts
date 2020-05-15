import express from 'express';
import { queryPagetion, deleteCommodity } from '@/controllers/commodity';

const router = express.Router();

router.get('/commodity/:id', (req, res) => {
  const id = req.params.id;
  queryPagetion(id)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(500).send({ status: 0, data: { msg: err.message } })
    );
});

router.delete('/commodity/:id', (req, res) => {
  const id = req.params.id;
  deleteCommodity(id)
    .then(() => res.send({ status: 1, data: { msg: '删除成功' } }))
    .catch((err) =>
      res.status(500).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;
