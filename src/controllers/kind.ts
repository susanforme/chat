import Kind from '@/models/kind';

export async function queryAllKind() {
  const data = await Kind.find();
  return data;
}

export async function insertKind(kindName: string, imgPath: string) {
  const kind = new Kind({ kindName, imgPath });
  const data = await kind.save();
  return data;
}
