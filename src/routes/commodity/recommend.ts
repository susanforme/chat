import express from 'express';
import { randomRecommendCommodity } from '@/controllers/commodity';

const router = express.Router();

router.get('/recommend', (req, res) => {
  randomRecommendCommodity()
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(500).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;
