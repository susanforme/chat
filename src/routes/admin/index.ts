import express from 'express';
const router = express.Router();

router.get('/admin', (req, res) => {
  res.send('adming');
});

export default router;
