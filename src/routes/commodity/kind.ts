import express from 'express';
import { queryAllKind } from '@/controllers/kind';

const router = express.Router();

router.get('/kind', (req, res) => {
  queryAllKind()
    .then((data) => res.send({ status: 1, data }))
    .catch(() => res.status(400).send({ status: 0 }));
});

export default router;
