import express from 'express';
import { queryCommodityByName } from '@/controllers/commodity';

const router = express.Router();

router.get('/search/:name', (req, res) => {
  const name = req.params.name;
  queryCommodityByName(name)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(500).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;
