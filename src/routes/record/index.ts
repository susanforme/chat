import express from 'express';
import { updateRecord } from '@/api/record';

const router = express.Router();

router.post('/record', (req, res) => {
  const body: uploadMsg = req.body;
});

export default router;

interface uploadMsg {
  roomId: string;
  send: {
    id: string;
    userName: string;
  };
  receive: {
    id: string;
    userName: string;
  };
  msg: string;
  createTime: string;
}
