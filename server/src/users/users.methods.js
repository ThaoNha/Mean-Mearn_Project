const UserModel = require('./users.models');

exports.getUser = async (username) => {
  try {
    const user = await UserModel.findOne({ username });
    return user;
  } catch (error) {
    return null;
  }
};

exports.createUser = async (user) => {
  try {
    const newUser = new UserModel({
      username: user.username,
      password: user.password,
    });
    await newUser.save();
    return true;
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

exports.getRoles = async (username) => {
  try {
    const user = await UserModel.findOne({ username });
    if (user) return user.roles;
    return null;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.updateRoles = async (username, roles) => {
  try {
    const filter = { username: username };
    await UserModel.findOneAndUpdate(filter, roles);
    return true;
  } catch (error) {
    return false;
  }
};