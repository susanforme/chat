//在这里进行需要使用admin数据库的所有操作,暴露接口
//这只是一个测试文件
import Topic from '../database/admin';
//提交文章

export function addTopic(data: any, callback: Function) {
  let artTopic = new Topic(data);
  artTopic.save(function (err, product) {
    if (err) {
      callback(err);
    } else {
      callback(null, product);
    }
  });
}
//查询所有文章
export function findTopic(callback: Function) {
  Topic.find(function (err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
}
