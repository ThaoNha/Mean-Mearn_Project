const roleMethod = require('./roles.methods');

exports.getAll = async (req, res) => {
  const roles = await roleMethod.getRoles();
  return res.send(roles);
};

exports.get = async (req, res) => {
  const name = req.params.roleName;
  const role = await roleMethod.getRole(name);
  if (!role) return res.status(400).send('Role is not found!');
  return res.send(role);
};

exports.create = async (req, res) => {
  const role = req.body;
  const roleResponse = await roleMethod.create(role);
  if (!roleResponse)
    return res.status(400).send('Creating Role is not completed!');
  return res.send(roleResponse);
};

exports.update = async (req, res) => {
  const role = req.body;
  const name = req.params.roleName;
  const roleResponse = await roleMethod.update(name,role);
  if (!roleResponse)
    return res.status(400).send('Updating Role is not completed!');
  return res.send(roleResponse);
};

exports.delete = async (req, res) => {
  const name = req.params.roleName;
  const result = await roleMethod.delete(name);
  if (!result) return res.status(400).send('Deleting Role is not completed. Users are using this role!');
  return res.status(200).send('Deleting Role is completed!');
};
