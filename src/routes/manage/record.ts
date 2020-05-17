import express from 'express';
import { queryPagationRecord, deleteRecord } from '@/controllers/record';
import { deleteRoomRecord } from '@/controllers/room';

const router = express.Router();

router.get('/record/:id_isNext', (req, res) => {
  const [id, isNext] = req.params.id_isNext.split('_');
  if (!(isNext === 'true' || isNext === 'false') && id !== '1') {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  const page: boolean = eval(isNext);
  queryPagationRecord(id, page)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

router.delete('/record/:id', (req, res) => {
  const id = req.params.id;
  deleteRecordApiColletions(id)
    .then(() => res.send({ status: 1, data: { msg: '删除成功' } }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;

async function deleteRecordApiColletions(id: string) {
  const data = await deleteRecord(id);
  await deleteRoomRecord(data.roomId, id);
}
