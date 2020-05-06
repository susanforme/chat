import express from 'express';
const router = express.Router();

router.get('/admin', (req, res) => {
  res.send('adming');
});
router.post('/admin', (req, res) => {
  res.send(req.body);
});
export default router;
