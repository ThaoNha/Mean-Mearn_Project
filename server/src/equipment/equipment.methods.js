const EquipmentModel = require('./equipment.models');

exports.getAll = async () => {
  try {
    return await EquipmentModel.find();
  } catch (error) {
    return null;
  }
};
exports.getEquipment = async (equipmentId) => {
  try {
    return await EquipmentModel.findOne({ _id: equipmentId }).populate('type');
  } catch (error) {
    return null;
  }
};

exports.create = async (reqEquipment) => {
  try {
    const newEquipment = new EquipmentModel({
      _id: reqEquipment._id,
      name: reqEquipment.name,
      type: reqEquipment.type,
      status: reqEquipment.status,
      description: reqEquipment.description,
    });
    await newEquipment.save();
    return newEquipment;
  } catch (error) {
    return null;
  }
};
exports.update = async (equipmentId, reqEquipment) => {
  try {
    const filter = { _id: equipmentId };
    await EquipmentModel.findOneAndUpdate(filter, reqEquipment);
    return await EquipmentModel.findOne({ _id: equipmentId }).populate('user');
  } catch (error) {
    return false;
  }
};
exports.delete = async (equipmentId) => {
  try {
    const equipment = await EquipmentModel.findOne({ _id: equipmentId });
    equipment.status = 'deleted';
    await update(equipmentId, equipment);
    return true;
  } catch (error) {
    return false;
  }
};
