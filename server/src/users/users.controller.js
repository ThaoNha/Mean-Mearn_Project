const userMethods = require('./users.methods');

exports.get = async (req, res) => {
  const users = await userMethods.get();
  return res.send(users);
};

exports.getUser = async (req, res) => {
  const users = await userMethods.getUser();
  return res.send(users);
};
exports.update = async (req, res) => {
  const newData = req.body;
  if (newData) {
    if (newData.status) {
      delete newData.status;
    }
    const update = await userMethods.updateUser(req.user.id, newData);
    if (update) {
      return res.send('Cập nhật user thành công.');
    } else {
      return res.status(400).send('Cập nhật không thành công!');
    }
  }
  return res.status(400).send('Cập nhật không thành công!');
};
exports.updateByUserId = async (req, res) => {
  const newData = req.body;
  const userId = req.params.userId;
  if (newData) {
    const update = await userMethods.updateUser(userId, newData);
    if (update) {
      return res.send('Cập nhật user thành công.');
    } else {
      return res.status(400).send('Cập nhật không thành công!');
    }
  }
  return res.status(400).send('Cập nhật không thành công!');
};
exports.forgetPassword = async (req, res) => {
  const newPassword = req.body;
  const userId = req.params.userId;
  if (newPassword) {
    await userMethods.updateUser(userId, newPassword);
    return res.send('Cập nhật user thành công.');
  }
};
