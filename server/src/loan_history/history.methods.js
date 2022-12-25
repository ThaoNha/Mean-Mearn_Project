const HistoryModel = require('./history.model');
const EquipmentMethods = require('../equipment/equipment.methods');
const UsersMethods = require('../users/users.methods');

exports.getAll = async () => {
  try {
    const histories = await HistoryModel.find().populate([
      'userId',
      'equipmentId',
      'lender',
      'adminReceiver',
    ]);
    const response = histories.map((history) => {
      return {
        historyID: history._id,
        username: history.userId.username,
        equipmentID: history.equipmentId.id,
        borrowDate: history.borrowDate,
        returnDate: history.returnDate ? history.returnDate : null,
        lender: history.lender.username,
        adminReceiver: history.adminReceiver
          ? history.adminReceiver.username
          : null,
      };
    });
    return response;
  } catch (error) {
    console.log(error)
    return null;
  }
};

exports.getByUsername = async (username) => {
  try {
    const user = await UsersMethods.getUserByUsername(username);
    const histories = await HistoryModel.find({ userId: user._id }).populate([
      'equipmentId',
      'userId',
      'lender',
      'adminReceiver',
    ]);
    const response = histories.map((history) => {
      return {
        historyID: history._id.toString(),
        username: history.userId.username,
        equipmentID: history.equipmentId.id,
        borrowDate: history.borrowDate,
        returnDate: history.returnDate ? history.returnDate : null,
        lender: history.lender.username,
        adminReceiver: history.adminReceiver
          ? history.adminReceiver.username
          : null,
      };
    });
    return response;
  } catch (error) {
    return null;
  }
};

exports.getByUserId = async (userId) => {
  try {
    const user = await UsersMethods.getUserById(userId);
    const histories = await HistoryModel.find({ userId: user._id }).populate([
      'equipmentId',
      'userId',
      'lender',
      'adminReceiver',
    ]);
    const response = histories.map((history) => {
      return {
        historyID: history._id.toString(),
        username: history.userId.username,
        equipmentID: history.equipmentId.id,
        borrowDate: history.borrowDate,
        returnDate: history.returnDate ? history.returnDate : null,
        lender: history.lender.username,
        adminReceiver: history.adminReceiver
          ? history.adminReceiver.username
          : null,
      };
    });
    return response;
  } catch (error) {
    return null;
  }
};

exports.getByEquipment = async (equipmentId) => {
  try {
    const equipment = await EquipmentMethods.getEquipment(equipmentId);
    const histories = await HistoryModel.find({
      equipmentId: equipment._id,
    }).populate(['equipmentId', 'userId', 'lender', 'adminReceiver']);
    const response = histories.map((history) => {
      return {
        historyID: history._id.toString(),
        username: history.userId.username,
        equipmentID: history.equipmentId.id,
        borrowDate: history.borrowDate,
        returnDate: history.returnDate ? history.returnDate : null,
        lender: history.lender.username,
        adminReceiver: history.adminReceiver
          ? history.adminReceiver.username
          : null,
      };
    });
    return response;
  } catch (error) {
    return null;
  }
};

exports.returnEquipment = async (historyId, admin) => {
  try {
    const history = await HistoryModel.findOne({ _id: historyId }).populate([
      'equipmentId',
      'userId',
      'lender',
      'adminReceiver',
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
    const date = new Date();
    history.returnDate =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
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
    const date = new Date();
    const borrowDate =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const newHistory = new HistoryModel({
      userId: user._id,
      equipmentId: equipment._id,
      lender: admin._id,
      borrowDate: borrowDate,
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
