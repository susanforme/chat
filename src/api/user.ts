import User from '../database/user';

//添加用户
export function addUser(data: UserMsg, callback: Function) {
  const user = new User(data);
  const { userName } = data;
  User.findOne({ userName }, (err, res) => {
    if (err) {
      callback(err);
    } else if (res) {
      callback({ status: 0, msg: '用户名已经存在' });
    } else {
      user.save(function (err, product) {
        if (err) {
          callback(err);
        } else {
          callback(null, product);
        }
      });
    }
  });
}
//通过id查询
export function findByIdUser(id: any, callback: Function) {
  User.findById(id, function (err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
}

//登录
export function findByNameUser(userName: string, callback: Function) {
  User.findOne({ userName }, function (err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
}

type UserMsg = {
  userName: string;
  password: string;
};
