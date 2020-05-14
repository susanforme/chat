import express from 'express';

const router = express.Router();

router.get('/logout', (req, res) => {
  req.session?.destroy(() => {
    res.send({ status: 1 });
  });
});

export default router;
