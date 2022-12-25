const UserModel = require('./users.models');
const roleMethod = require('../roles/roles.methods');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../variables/auth');

exports.get = async () => {
  try {
    const users = await UserModel.find().populate('role');
    const response = users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        role: user.role.name,
        status: user.status,
      };
    });
    return response;
  } catch (error) {
    return null;
  }
};

exports.getUser = async () => {
  try {
    const users = await UserModel.find().populate('role');
    const response = users
      .filter((user) => user.role.name === 'user' && user.status === 'activate')
      .map((user) => {
        return {
          id: user.id,
          username: user.username,
          role: user.role.name,
          status: user.status,
        };
      });
    return response;
  } catch (error) {
    return null;
  }
};

exports.getUserByRole = async (role) => {
  try {
    const users = await UserModel.find({ role: role });
    return users;
  } catch (error) {
    return false;
  }
};
exports.getUserByUsername = async (username) => {
  try {
    const user = await UserModel.findOne({ username: username }).populate(
      'role',
    );
    return user;
  } catch (error) {
    return null;
  }
};
exports.getUserById = async (id) => {
  try {
    const user = await UserModel.findOne({ id: id }).populate('role');
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
      id: user.id,
      username: user.username,
      password: user.password,
      role: role._id,
      status: user.status,
    });

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

exports.updateUser = async (userId, newData) => {
  try {
    if (newData.id) {
      delete newData.id;
    }
    if (newData.username) {
      delete newData.username;
    }
    if (newData.role) {
      const role = await roleMethod.getRole(newData.role);
      newData.role = role._id;
    }
    if (newData.password) {
      const hashPassword = bcrypt.hashSync(newData.password, SALT_ROUNDS);
      newData.password = hashPassword;
    }
    await UserModel.findOneAndUpdate({ id: userId }, newData);
    return true;
  } catch (error) {
    return false;
  }
};
