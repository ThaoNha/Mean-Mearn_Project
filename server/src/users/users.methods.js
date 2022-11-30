const UserModel = require('./users.models');
const roleMethod = require('../roles/roles.methods');
const statusMethod = require('../status/status.methods');

exports.getUser = async (username) => {
  try {
    const user = await UserModel.findOne({ username }).populate('roles').populate('status');
    return user;
  } catch (error) {
    return null;
  }
};

exports.createUser = async (user) => {
  try {
    let role = null;
    let status = null;
    if (user.role) {
      role = await roleMethod.getRole(user.role);
    }
    if(user.status){
      status= await statusMethod.getStatus(user.status);
    }
    const newUser = new UserModel({
      username: user.username,
      password: user.password,
      role: role._id,
      status: status._id,
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
    if (newUser.status) {
      const status = await statusMethod.getRole(newUser.status);
      newUser.status = status._id;
    }
    await UserModel.findOneAndUpdate(filter, newUser);
    return true;
  } catch (error) {
    return false;
  }
};
