import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const CarouselSchema = new Schema({
  createTime: {
    type: String,
    default: new Date().toLocaleString(), //不传入创建时间的默认方法
  },
  url: {
    type: String,
  },
  commodityId: {
    type: String,
  },
  imgPath: {
    type: String,
    required: true,
  },
});
const Carousel = mongoose.model<ICarousel>('Carousel', CarouselSchema);

export default Carousel;

interface ICarousel extends mongoose.Document {
  createTime: string;
  url?: string;
  commodityId?: string;
  imgPath: string;
}
