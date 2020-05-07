import express from 'express';

const router = express.Router();

router.all('*', (req, res) => {
  res.status(404).send({ status: 'error' });
});

export default router;
