const HistoryModel = require('./history.model');
const EquipmentMethods = require('../equipment/equipment.methods');

exports.getAll = async () => {
  try {
    return await HistoryModel.find();
  } catch (error) {
    return null;
  }
};

exports.getByUser = async (userId) => {
  try {
    return await HistoryModel.find({ userId: userId }).populate([
      'equipment',
      'users',
    ]);
  } catch (error) {
    return null;
  }
};

exports.getByEquipment = async (equipmentId) => {
  try {
    return await HistoryModel.find({ equipmentId: equipmentId }).populate([
      'equipment',
      'users',
    ]);
  } catch (error) {
    return null;
  }
};

exports.returnEquipment = async (historyId, admin) => {
  try {
    const equipment = await EquipmentMethods.getEquipment(history.equipmentId);
    if (equipment.status === 'borrowed') {
      return false;
    }
    const history = await HistoryModel.findOne({ _id: historyId });
    history.returnDate = Date.now();
    history.adminReceiver = admin._id;
    await HistoryModel.findOneAndUpdate({ _id: historyId }, history);
    equipment.status = 'available';
    const equipmentUpdate = await EquipmentMethods.update(
      equipment._id,
      equipment,
    );
    if (!equipmentUpdate) return false;
    return true;
  } catch (error) {
    return null;
  }
};

exports.create = async (history, admin) => {
  try {
    const equipment = await EquipmentMethods.getEquipment(history.equipmentId);
    if (equipment.status === 'available') {
      return false;
    }
    const newHistory = new HistoryModel({
      userId: history.userId,
      equipmentId: history.equipmentId,
      lender: admin._id,
    });
    const saveHistory = await newHistory.save();
    if (saveHistory) {
      equipment.status = 'borrowed';
      await EquipmentMethods.update(equipment._id, equipment);
      return true;
    }
    return false;
  } catch (error) {
    return null;
  }
};
