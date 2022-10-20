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
    return await EquipmentModel.findOne({ _id: equipmentId });
  } catch (error) {
    return null;
  }
};
exports.getEquipmentByUserId = async (userId) => {
  try {
    return await EquipmentModel.findOne({ user: userId });
  } catch (error) {
    return null;
  }
};
exports.create = async (reqEquipment) => {
  try {
    let newEquipment;
    if (reqEquipment.user) {
      const user = await UserModel.findOne({ username: reqEquipment.user });
      newEquipment = new EquipmentModel({
        name: reqEquipment.name,
        type: reqEquipment.type,
        status: reqEquipment.status,
        description: reqEquipment.description,
        user: user._id,
      });
    } else {
      newEquipment = new EquipmentModel({
        name: reqEquipment.name,
        type: reqEquipment.type,
        status: reqEquipment.status,
        description: reqEquipment.description,
      });
    }
    await newEquipment.save();
    return newEquipment;
  } catch (error) {
    return null;
  }
};
exports.update = async (equipmentId, reqEquipment) => {
  try {
    const filter = { _id: equipmentId };
    reqEquipment.modifyBy = req.user._id;
    reqEquipment.modifyAt = Date.now();
    await EquipmentModel.findOneAndUpdate(filter, reqEquipment);
    return true;
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
