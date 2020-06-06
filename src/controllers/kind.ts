import Kind from '@/models/kind';

/**
 * 查询分类
 */
export async function queryAllKind() {
  const data = await Kind.find();
  return data;
}

/**
 * 添加分类
 */
export async function insertKind(kindName: string, imgPath: string) {
  const kind = new Kind({
    kindName,
    imgPath,
    createTime: new Date().toLocaleString(),
  });
  const isHavaSameName = await Kind.findOne({ kindName });
  if (isHavaSameName) {
    throw new Error('已经存在相同分类名');
  }
  const data = await kind.save();
  return data;
}

/**
 * 删除分类
 * @param kindName
 */
export async function deleteKind(kindName: string) {
  await Kind.findOneAndDelete({ kindName });
  return;
}
