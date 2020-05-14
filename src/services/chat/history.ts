import { queryPersonalHistoryChat } from '@/controllers/room';
import { Response, Request } from 'express-serve-static-core';

export const historyRouterConfig = (req: Request, res: Response) => {
  // const users = req.params.id.split('_');
  // const roomId = users.sort().reduce((pre, cur) => pre + cur);
  // if (roomId) {
  //   return queryPersonalHistoryChat(roomId, (err: any, data: any) => {
  //     if (err) {
  //       return res.status(500).send(err);
  //     }
  //     res.send({ status: 1, data });
  //   });
  // }
  // res.status(400).send({ status: 0, data: { msg: '参数错误' } });
};
