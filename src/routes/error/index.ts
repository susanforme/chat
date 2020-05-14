import express from 'express';

const router = express.Router();

router.all('*', (req, res) => {
  res.status(404).send({ status: 0, data: { msg: 'error' } });
});

export default router;
