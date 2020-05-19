import express from 'express';
import { queryCarousel } from '@/controllers/carousel';

const router = express.Router();

router.get('/carousel', (req, res) => {
  queryCarousel()
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;
