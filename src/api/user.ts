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
export function findByIdUser(id: string, callback: Function) {
  User.findById(id, function (err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
}

//登录
export function findByNameUser(body: UserMsg, callback: Function) {
  User.findOne(body, 'userName', function (err, res) {
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
