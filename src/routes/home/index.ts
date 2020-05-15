import express from 'express';
import notice from './notice';

const router = express.Router();

//公告
router.use(notice);

export default router;
