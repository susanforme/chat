import Carousel from '@/models/carousel';

/**
 * 添加轮播图
 */
export async function insertCarousel(data: UploadData) {
  const carousel = new Carousel({
    ...data,
    createTime: new Date().toLocaleString(),
  });
  const body = await carousel.save();
  return body;
}

/**
 * 只查询4条轮播图
 */
export async function queryCarousel() {
  const data = await Carousel.find().sort({ _id: -1 }).limit(4);
  return data;
}

interface UploadData {
  url?: string;
  commodityId?: string;
  imgPath: string;
}

/**
 * 查询所有
 */

export async function queryAllCarousel() {
  const data = await Carousel.find();
  return data;
}

/**
 * 删除指定轮播
 */
export async function deleteCarsousel(id: string) {
  await Carousel.findByIdAndDelete(id);
  return;
}
