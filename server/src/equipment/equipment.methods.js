const EquipmentModel = require('./equipment.models');
const UserModel = require('../users/users.models');

exports.getAll = async () => {
  try {
    return await EquipmentModel.find();
  } catch (error) {
    return null;
  }
};
exports.getEquipment = async (equipmentId) => {
  try {
    return await EquipmentModel.findOne({ _id: equipmentId }).populate('user');
  } catch (error) {
    return null;
  }
};
exports.getEquipmentByUserId = async (userId) => {
  try {
    return await EquipmentModel.findOne({ user: userId }).populate('user');
  } catch (error) {
    return null;
  }
};
exports.create = async (reqEquipment, user) => {
  try {
    const newEquipment = new EquipmentModel({
      name: reqEquipment.name,
      type: reqEquipment.type,
      status: reqEquipment.status,
      description: reqEquipment.description,
      createBy: user._id,
    });
    if (reqEquipment.user) {
      const user = await UserModel.findOne({ username: reqEquipment.user });
      newEquipment.user = user._id;
    }
    await newEquipment.save();
    return newEquipment;
  } catch (error) {
    return null;
  }
};
exports.update = async (equipmentId, reqEquipment, user) => {
  try {
    const filter = { _id: equipmentId };
    reqEquipment.modifyBy = user._id;
    reqEquipment.modifyAt = Date.now();
    if (reqEquipment.user) {
      const user = await UserModel.findOne({ username: reqEquipment.user });
      if (!user) return false;
      reqEquipment.user = user._id;
    }
    await EquipmentModel.findOneAndUpdate(filter, reqEquipment);
    return await EquipmentModel.findOne({ _id: equipmentId }).populate('user');
  } catch (error) {
    return false;
  }
};
exports.delete = async (equipmentId) => {
  try {
    await EquipmentModel.findOneAndDelete({ _id: equipmentId });
    return true;
  } catch (error) {
    return false;
  }
};
