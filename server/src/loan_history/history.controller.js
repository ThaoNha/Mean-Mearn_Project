const historyMethods = require('./history.methods');

exports.getAll = async (req, res) => {
  try {
    const histories = await historyMethods.getAll();
    return res.send(histories);
  } catch (error) {
    return null;
  }
};

exports.getByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const histories = await historyMethods.getByUser(userId);
    if (!histories) return res.status(400).send('History is not found!');
    return res.send(histories);
  } catch (error) {
    return null;
  }
};

exports.getByEquipment = async (req, res) => {
  try {
    const equipmentId = req.params.equipmentId;
    const histories = await historyMethods.getByEquipment(equipmentId);
    if (!histories) return res.status(400).send('History is not found!');
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
    return res.status(200);
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
    return res.send(create);
  } catch (error) {
    return null;
  }
};
