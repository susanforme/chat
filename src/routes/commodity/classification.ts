import express from 'express';
import { queryByKindGetCommodity } from '@/controllers/commodity';

const router = express.Router();

router.get('/classification/:id', (req, res) => {
  const id = req.params.id;
  queryByKindGetCommodity(id)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(500).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;
