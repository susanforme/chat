import express from 'express';
import { queryNotice } from '@/controllers/notice';

const router = express.Router();

router.get('/notice', (req, res) => {
  queryNotice()
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(500).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;
