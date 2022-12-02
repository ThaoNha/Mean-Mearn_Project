const EquipmentModel = require('./equipment.models');
const TypeMethod = require('../type/type.methods');
exports.getAll = async () => {
  try {
    return await EquipmentModel.find().populate('type');
  } catch (error) {
    return null;
  }
};
exports.getEquipment = async (equipmentId) => {
  try {
    return await EquipmentModel.findOne({ id: equipmentId }).populate('type');
  } catch (error) {
    return null;
  }
};
exports.getByType = async (typeId) =>{
  try { 
    return await EquipmentModel.find({ type: typeId });
  } catch (error) {
    return false;
  }
}
exports.create = async (reqEquipment) => {
  try {
    const type = await TypeMethod.getType(reqEquipment.type);
    if (type) {
      const newEquipment = new EquipmentModel({
        id: reqEquipment.id,
        name: reqEquipment.name,
        type: type._id,
        status: reqEquipment.status,
        description: reqEquipment.description,
      });
      const equipment = await (await newEquipment.save()).populate('type');
      return equipment;
    }
    return false;
  } catch (error) {
    return null;
  }
};
exports.update = async (equipmentId, reqEquipment) => {
  try {
    if(reqEquipment.id){
      delete reqEquipment.id;
    }
    if (reqEquipment.type) {
      const type = await TypeMethod.getType(reqEquipment.type);
      reqEquipment.type = type._id;
    } 
    await EquipmentModel.findOneAndUpdate({ id: equipmentId }, reqEquipment);
    return await EquipmentModel.findOne({ id: equipmentId }).populate('type');
  } catch (error) {
    return false;
  }
};
exports.delete = async (equipmentId) => {
  try {
    const equipment = await EquipmentModel.findOne({ id: equipmentId });
    equipment.status = 'deleted';
    await EquipmentModel.findOneAndUpdate({ id: equipmentId }, equipment);
    return true;
  } catch (error) {
    return false;
  }
};
