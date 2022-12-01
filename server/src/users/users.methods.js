const UserModel = require('./users.models');
const roleMethod = require('../roles/roles.methods');

exports.getUser = async (username) => {
  try {
    const user = await UserModel.findOne({ username }).populate('roles');
    return user;
  } catch (error) {
    return null;
  }
};

exports.createUser = async (user) => {
  try {
    let role = null;
    if (user.role) {
      role = await roleMethod.getRole(user.role);
    }
    const newUser = new UserModel({
      _id: user._id,
      username: user.username,
      password: user.password,
      role: role._id,
      status: user.status,
    });

    console.log(newUser);
    await newUser.save();
    return newUser;
  } catch (error) {
    return false;
  }
};

exports.updateToken = async (username, token) => {
  try {
    const filter = { username: username };
    await UserModel.findOneAndUpdate(filter, token);
    return true;
  } catch (error) {
    return false;
  }
};

exports.updateUser = async (username, newUser) => {
  try {
    const filter = { username: username };
    if (newUser.role) {
      const role = await roleMethod.getRole(newUser.role);
      newUser.role = role._id;
    }
    await UserModel.findOneAndUpdate(filter, newUser);
    return true;
  } catch (error) {
    return false;
  }
};
