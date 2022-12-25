const historyMethods = require('./history.methods');

exports.getAll = async (req, res) => {
  try {
    const histories = await historyMethods.getAll();
    return res.send(histories);
  } catch (error) {
    return null;
  }
};
exports.getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const histories = await historyMethods.getByUserId(userId);
    return res.json(histories);
  } catch (error) {
    return null;
  }
}

exports.getByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const histories = await historyMethods.getByUserId(userId);
    return res.send(histories);
  } catch (error) {
    return null;
  }
};
exports.getByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const histories = await historyMethods.getByUsername(username);
    return res.send(histories);
  } catch (error) {
    return null;
  }
};

exports.getByEquipment = async (req, res) => {
  try {
    const equipmentId = req.params.equipmentId;
    const histories = await historyMethods.getByEquipment(equipmentId);
    return res.send(histories);
  } catch (error) {
    return null;
  }
};

exports.returnEquipment = async (req, res) => {
  try {
    const historyId = req.params.historyId;
    const admin = req.user;
    const returnEquipment = await historyMethods.returnEquipment(
      historyId,
      admin,
    );
    if (!returnEquipment)
      return res.status(400).send('Return equipment is not completed!');
    return res.send("Return equipment is completed!");
  } catch (error) {
    return null;
  }
};

exports.create = async (req, res) => {
  try {
    const history = req.body;
    const admin = req.user;
    const create = await historyMethods.create(history, admin);
    if (!create)
      return res.status(400).send('Creating history is not completed!');
    return res.send("Creating history is completed!");
  } catch (error) {
    return null;
  }
};
