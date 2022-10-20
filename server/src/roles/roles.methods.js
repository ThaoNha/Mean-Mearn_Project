const RoleModel = require('./roles.model');

exports.getRoles = async () => {
  try {
    const roles = await RoleModel.find();
    return roles;
  } catch (error) {
    return null;
  }
};

exports.getRole = async (keyword) => {
  try {
    return await RoleModel.findOne({ keyword });
  } catch (error) {
    return null;
  }
};

exports.create = async (role) => {
  try {
    const newRole = new RoleModel({
      keyword: role.keyword,
      name: role.name,
    });
    const roleResponse = await newRole.save();
    return roleResponse;
  } catch (error) {
    return false;
  }
};

exports.update = async (keyword, role) => {
  try {
      const filter = { keyword: keyword };
      await RoleModel.findOneAndUpdate(filter, role);
      return true;
  } catch (error) {
    return false;
  }
};

exports.delete = async (keyword) => {
  try {
    await RoleModel.findOneAndDelete({ keyword });
    return true;
  } catch (error) {
    return false;
  }
};
