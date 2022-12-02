const HistoryModel = require('./history.model');
const EquipmentMethods = require('../equipment/equipment.methods');
const UsersMethods = require('../users/users.methods');

exports.getAll = async () => {
  try {
    return await HistoryModel.find().populate([
      'userId',
      'equipmentId',
      'lender',
      'adminReceiver'
    ]);
  } catch (error) {
    return null;
  }
};

exports.getByUsername = async (username) => {
  try {
    const user = await UsersMethods.getUserByUsername(username);
    return await HistoryModel.find({ userId: user._id }).populate([
      'equipmentId',
      'userId',
    ]);
  } catch (error) {
    return null;
  }
};

exports.getByUserId = async (userId) => {
  try {
    const user = await UsersMethods.getUserById(userId);
    return await HistoryModel.find({ userId: user._id }).populate([
      'equipmentId',
      'userId',
    ]);
  } catch (error) {
    return null;
  }
};

exports.getByEquipment = async (equipmentId) => {
  try {
    const equipment = await EquipmentMethods.getEquipment(equipmentId);
    return await HistoryModel.find({ equipmentId: equipment._id }).populate([
      'equipmentId',
      'userId',
    ]);
  } catch (error) {
    return null;
  }
};

exports.returnEquipment = async (historyId, admin) => {
  try {
    const history = await HistoryModel.findOne({ _id: historyId }).populate([
      'equipmentId',
      'userId',
    ]);
    if (history.equipmentId.status !== 'borrowed') {
      return false;
    }
    const equipmentUpdate = await EquipmentMethods.update(
      history.equipmentId.id,
      {
        status: 'available',
      },
    );
    if (!equipmentUpdate) return false;
    history.returnDate = Date.now();
    history.adminReceiver = admin._id;
    const historyUpdate = await HistoryModel.findOneAndUpdate(
      { _id: historyId },
      history,
    );
    if (!historyUpdate) return false;
    return true;
  } catch (error) {
    return false;
  }
};

exports.create = async (history, admin) => {
  try {
    const equipment = await EquipmentMethods.getEquipment(history.equipmentId);
    if (equipment && equipment.status !== 'available') {
      return false;
    }
    const user = await UsersMethods.getUserById(history.userId);
    if (user && (user.status === 'block' || user.status === 'delete')) {
      return false;
    }
    const newHistory = new HistoryModel({
      userId: user._id,
      equipmentId: equipment._id,
      lender: admin._id,
    });
    const saveHistory = await newHistory.save();
    if (saveHistory) {
      await EquipmentMethods.update(equipment.id, { status: 'borrowed' });
      return true;
    }
    return false;
  } catch (error) {
    return null;
  }
};
