import express from 'express';
const router = express.Router();

router.get('/check', (req, res) => {
  res.send((req.session as Express.Session).userName);
});

export default router;
