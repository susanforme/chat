import express from 'express';
import {
  insertCarousel,
  queryAllCarousel,
  deleteCarsousel,
} from '@/controllers/carousel';

const router = express.Router();

router.get('/carousel', (req, res) => {
  queryAllCarousel()
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

router.post('/carousel', (req, res) => {
  const body = req.body;
  insertCarousel(body)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

router.delete('/carousel/:id', (req, res) => {
  const id = req.params.id;
  deleteCarsousel(id)
    .then(() => res.send({ status: 1 }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;
