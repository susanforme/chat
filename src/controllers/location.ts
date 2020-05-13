import Location from '@/models/location';
import mongoose from 'mongoose';

//需要判断cookie是否存在
export function updateLocation(uploadData: uploadLocation, callback: Function) {
  const { area, name, phoneNum } = uploadData;
  Location.findOne({ user: uploadData.userId })
    .populate('user')
    .exec((err, data) => {
      if (err) {
        return callback({ status: 0, data: { msg: '服务器错误' } });
      } else if (data) {
        return Location.updateOne(
          { user: uploadData.userId },
          {
            information: [
              ...data.information,
              { area, name, phoneNum, _id: mongoose.Types.ObjectId() },
            ],
          },
          (err, raw) => {
            if (err) {
              return callback({ status: 0, data: { msg: '服务器错误' } });
            }
            const { information } = data;
            return callback(null, information);
          }
        );
      }
      const location = new Location({
        user: uploadData.userId,
        information: [{ area, name, phoneNum, _id: mongoose.Types.ObjectId() }],
      });
      location.save((err, saveData) => {
        if (err) {
          return callback({ status: 0, data: { msg: '服务器错误' } });
        }
        Location.findOne({ user: uploadData.userId })
          .populate('user')
          .exec((err, data) => {
            if (err) {
              return callback({ status: 0, data: { msg: '服务器错误' } });
            }
            return callback(null, data?.information);
          });
      });
    });
}

//请求地址
export function queryLocation(user: string, callback: Function) {
  Location.findOne({ user }, 'information', (err, data) => {
    if (err) {
      return callback({ status: 0, data: { msg: '服务器错误' } });
    }
    callback(null, data);
  });
}

//删除单个地址
export function deleteLocation(
  user: string,
  position: string,
  callback: Function
) {
  Location.findOneAndUpdate(
    { user },
    { $pull: { information: { _id: mongoose.Types.ObjectId(position) } } },
    (err, data) => {
      if (err) {
        return callback({ status: 0, data: { msg: '服务器错误' } });
      }
      callback(null);
    }
  );
}

interface uploadLocation {
  name: string;
  area: string;
  userId: string;
  phoneNum: number;
}
