const EquipmentModel = require('./equipment.models');
const TypeMethod = require('../type/type.methods');
exports.getAll = async () => {
  try {
    const equipments = await EquipmentModel.find().populate('type');
    const response = equipments.map((equipment) => {
      return {
        id: equipment.id,
        name: equipment.name,
        type: equipment.type.name,
        description: equipment.description,
        status: equipment.status,
      };
    });
    return response;
  } catch (error) {
    return null;
  }
};
exports.getActive = async () => {
  try {
    const equipments = await EquipmentModel.find().populate('type');
    const response = equipments
      .filter((equipment) => equipment.status === 'available')
      .map((equipment) => {
        return {
          id: equipment.id,
          name: equipment.name,
          type: equipment.type.name,
          description: equipment.description,
          status: equipment.status,
        };
      });
    return response;
  } catch (error) {
    return null;
  }
};
exports.getEquipment = async (equipmentId) => {
  try {
    const equipment = await EquipmentModel.findOne({
      id: equipmentId,
    }).populate('type');
    return {
      _id: equipment._id,
      id: equipment.id,
      name: equipment.name,
      type: equipment.type.name,
      description: equipment.description,
      status: equipment.status,
    };
  } catch (error) {
    return null;
  }
};
exports.getByType = async (typeId) => {
  try {
    const equipments = await EquipmentModel.find({ type: typeId });
    const response = equipments.map((equipment) => {
      return {
        id: equipment.id,
        name: equipment.name,
        type: equipment.type.name,
        description: equipment.description,
        status: equipment.status,
      };
    });
    return response;
  } catch (error) {
    return false;
  }
};
exports.create = async (reqEquipment) => {
  try {
    if (reqEquipment.status) {
      switch (reqEquipment.status) {
        case 'available':
        case 'borrowed':
        case 'repairing':
        case 'deleted':
          break;
        default:
          delete reqEquipment.status;
          break;
      }
    }
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
      return {
        id: equipment.id,
        name: equipment.name,
        type: equipment.type.name,
        description: equipment.description,
        status: equipment.status,
      };
    }
    return false;
  } catch (error) {
    return null;
  }
};
exports.update = async (equipmentId, reqEquipment) => {
  try {
    if (reqEquipment.status) {
      switch (reqEquipment.status) {
        case 'available':
        case 'borrowed':
        case 'repairing':
        case 'deleted':
          break;
        default:
          delete reqEquipment.status;
          break;
      }
    }
    if (reqEquipment.id) {
      delete reqEquipment.id;
    }
    if (reqEquipment.type) {
      const type = await TypeMethod.getType(reqEquipment.type);
      reqEquipment.type = type._id;
    }
    const equipment = await EquipmentModel.findOneAndUpdate(
      { id: equipmentId },
      reqEquipment,
    );
    if (equipment) return true;
    else return false;
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
