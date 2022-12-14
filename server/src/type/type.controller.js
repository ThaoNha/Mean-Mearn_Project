const typeMethod = require('./type.methods');

exports.getAll = async (req, res) => {
  const types = await typeMethod.getTypes();
  return res.send(types);
};

exports.get = async (req, res) => {
  const name = req.params.typeKeyword;
  const type = await typeMethod.getType(name);
  if (!type) return res.status(400).send('Type is not found!');
  return res.send(type);
};

exports.create = async (req, res) => {
  const type = req.body;
  const typeResponse = await typeMethod.create(type);
  if (!typeResponse)
    return res.status(400).send('Creating Type is not completed!');
  return res.send(typeResponse);
};

exports.update = async (req, res) => {
  const type = req.body;
  const name = req.params.typeName;
  const typeResponse = await typeMethod.update(name,type);
  if (!typeResponse)
    return res.status(400).send('Updating Type is not completed!');
  return res.send(typeResponse);
};
exports.delete = async (req, res) => {
  const name = req.params.typeName;
  const result = await typeMethod.delete(name);
  if (!result) return res.status(400).send('Deleting Type is not completed!');
  return res.status(200).send('Deleting Type is completed!');
};
