import Notice from '@/models/notice';

/**
 * 查询所有公告
 */
export async function queryNotice() {
  const data = await Notice.find();
  return data;
}

/**
 * 发布公告
 * @param body
 */
export async function insertNotice(body: InsertBody) {
  const notice = new Notice({
    ...body,
    createTime: new Date().toLocaleString(),
  });
  const data = await notice.save();
  return data;
}

/**
 * 删除公告
 * @param id
 */
export async function deleteNotice(id: string) {
  await Notice.findByIdAndDelete(id);
  return;
}

interface InsertBody {
  content: string;
  imgPath: string;
}
