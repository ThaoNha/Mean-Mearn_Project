const equipmentMethod = require('./equipment.methods');

exports.getAll = async (req, res) => {
  try {
    const equipments = await equipmentMethod.getAll();
    return res.send(equipments);
  } catch (error) {
    return null;
  }
};
exports.get = async (req, res) => {
  try {
    const equipmentId = req.params.equipmentId;
    const equipment = await equipmentMethod.getEquipment(equipmentId);
    return res.send(equipment);
  } catch (error) {
    return null;
  }
};

exports.create = async (req, res) => {
  try {
    const reqEquipment = req.body;
    const checkEquipmentId = await equipmentMethod.getEquipment(
      reqEquipment.id,
    );
    if (checkEquipmentId)
      return res.status(400).send('Equipment ID is existed!');
    const equipment = await equipmentMethod.create(reqEquipment);
    if (!equipment)
      return res.status(400).send('Creating Equipment is not completed!');
    return res.send(equipment);
  } catch (error) {
    return null;
  }
};
exports.update = async (req, res) => {
  try {
    const equipmentId = req.params.equipmentId;
    const reqEquipment = req.body;
    const equipmentExist = await equipmentMethod.getEquipment(equipmentId);
    if (!equipmentExist) return res.status(400).send('Equipment is not existed!');
    const equipment = await equipmentMethod.update(equipmentId, reqEquipment);
    if (!equipment)
      return res.status(400).send('Updating Equipment is not completed!');
    return res.send(equipment);
  } catch (error) {}
};
exports.delete = async (req, res) => {
  try {
    const equipmentId = req.params.equipmentId;
    const result = await equipmentMethod.delete(equipmentId);
    return result
      ? res.status(200).send('Deleting is completed!')
      : res.status(400).send('Deleting is not completed!');
  } catch (error) {}
};
