import express from 'express';
import { queryPagtionUser, deleteUser } from '@/controllers/user';

const router = express.Router();

router.get('/user/:id', (req, res) => {
  const id = req.params.id;
  queryPagtionUser(id)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

router.delete('/user/:id', (req, res) => {
  const id = req.params.id;
  deleteUser(id)
    .then(() => res.send({ status: 1, data: { msg: '删除成功' } }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;
