const statusMethod = require('./status.methods');

exports.getAll = async (req, res) => {
  const status = await statusMethod.getStatus();
  return res.send(status);
};

exports.get = async (req, res) => {
  const name = req.params.name;
  const status = await statusMethod.getStatus(name);
  if (!status) return res.status(400).send('Status is not found!');
  return res.send(status);
};

exports.create = async (req, res) => {
  const status = req.body;
  const statusResponse = await statusMethod.create(status);
  if (!statusResponse)
    return res.status(400).send('Creating Status is not completed!');
  return res.send(statusResponse);
};


exports.delete = async (req, res) => {
  const name = req.params.statusKeyword;
  const result = await statusMethod.delete(name);
  if (!result) return res.status(400).send('Deleting Status is not completed!');
  return res.status(200).send('Deleting Status is completed!');
};
