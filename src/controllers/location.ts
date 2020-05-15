import Location from '@/models/location';
import mongoose from 'mongoose';

/**
 * 插入或更新地址
 */
export async function updateLocation(uploadData: uploadLocation) {
  const { area, name, phoneNum } = uploadData;
  const data = await Location.findOneAndUpdate(
    { user: uploadData.userId },
    {
      $push: {
        information: { area, name, phoneNum, _id: mongoose.Types.ObjectId() },
      },
    },
    { setDefaultsOnInsert: true, upsert: true }
  );
  return data;
}

/**
 * 查询地址
 */
export async function queryLocation(user: string) {
  const data = await Location.findOne({ user }, 'information');
  return data;
}

/**
 * 删除单个地址
 * @param user
 * @param position
 */
export async function deleteLocation(user: string, position: string) {
  await Location.findOneAndUpdate(
    { user },
    { $pull: { information: { _id: mongoose.Types.ObjectId(position) } } }
  );
  return;
}

interface uploadLocation {
  name: string;
  area: string;
  userId: string;
  phoneNum: number;
}
