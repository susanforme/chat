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
  const kind = new Kind({ kindName, imgPath });
  const data = await kind.save();
  return data;
}
