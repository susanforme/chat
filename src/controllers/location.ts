import Location from '@/models/location';

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
          { information: [...data.information, { area, name, phoneNum }] },
          (err, raw) => {
            if (err) {
              return callback({ status: 0, data: { msg: '服务器错误' } });
            }
            return callback(null, { area, name, phoneNum });
          }
        );
      }
      const location = new Location({
        user: uploadData.userId,
        information: [{ area, name, phoneNum }],
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

interface uploadLocation {
  /*
   **
   */
  name: string;
  area: string;
  userId: string;
  phoneNum: number;
}
