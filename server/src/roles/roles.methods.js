const RoleModel = require('./roles.model');
const UserMethod = require('../users/users.methods');

exports.getRoles = async () => {
  try {
    const roles = await RoleModel.find();
    return roles;
  } catch (error) {
    return null;
  }
};

exports.getRole = async (name) => {
  try {
    return await RoleModel.findOne({ name: name });
  } catch (error) {
    return null;
  }
};

exports.create = async (role) => {
  try {
    const newRole = new RoleModel({
      name: role.name,
    });
    const roleResponse = await newRole.save();
    return roleResponse;
  } catch (error) {
    return false;
  }
};

exports.delete = async (name) => {
  try {
    const role = await RoleModel.findOne({ name: name }); 
    const user = await UserMethod.getUserByRole(role._id);
    if (user) return false;
    await RoleModel.findOneAndDelete({ name });
    return true;
  } catch (error) {
    return false;
  }
};
