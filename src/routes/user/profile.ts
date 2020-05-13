import express from 'express';

const router = express.Router();

router.get('/profile/:id', (req, res) => {
  const id = req.params.id;
  res.send('profile');
});

export default router;
