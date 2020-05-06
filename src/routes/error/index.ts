import express from 'express';

const router = express.Router();

router.get('*', (req, res) => {
  res.status(404).send({ status: 'error' });
});

router.post('*', (req, res) => {
  res.status(404).send({ status: 'error' });
});

router.put('*', (req, res) => {
  res.status(404).send({ status: 'error' });
});

router.delete('*', (req, res) => {
  res.status(404).send({ status: 'error' });
});

export default router;
