import express from 'express';
import { historyRouterConfig } from '@/services/chat/history';

const router = express.Router();

router.get('/history/:id', historyRouterConfig);

export default router;
