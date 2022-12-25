const TypeModel = require('./type.model');
const EquipmentMethod = require('../equipment/equipment.methods');

exports.getTypes = async () => {
  try {
    const types = await TypeModel.find();
    return types;
  } catch (error) {
    return null;
  }
};

exports.getType = async (name) => {
  try {
    return await TypeModel.findOne({ name });
  } catch (error) {
    return null;
  }
};

exports.create = async (type) => {
  try {
    const newType = new TypeModel({
      name: type.name,
    });
    const typeResponse = await newType.save();
    return typeResponse;
  } catch (error) {
    return false;
  }
};
exports.update = async (name, type) => {
  try {
    const typeOld = await TypeModel.findOne({ name: name });
    const equipments = await EquipmentMethod.getByType(typeOld._id);
    if (equipments.length !== 0) return false;
    await TypeModel.findOneAndUpdate({ name: name }, type);
    return true;
  } catch (error) {
    return false;
  }
};

exports.delete = async (name) => {
  try {
    const type = await TypeModel.findOne({ name: name });
    const equipments = await EquipmentMethod.getByType(type._id);
    if (equipments.length !== 0) return false;
    await TypeModel.findOneAndUpdate({ name: name }, { status: 'deleted' });
    return true;
  } catch (error) {
    return false;
  }
};
