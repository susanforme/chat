//这是一个测试数据库搭建
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
let TopicSchema = new Schema({
  account: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now(), //不传入创建时间的默认方法
  },
});
const Topic = mongoose.model('Topic', TopicSchema);

export default Topic;
