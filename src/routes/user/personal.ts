import express from 'express';

const router = express.Router();

router.get('/personal/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
});

export default router;
