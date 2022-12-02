const userMethods = require('./users.methods');

exports.get = async (req, res) => {
  const users = await userMethods.get();
  return res.send(users);
};

exports.update = async (req, res) => {
  const newData = req.body;
  if (newData) {
    const update = await userMethods.updateUser(req.user.id, newData);
    if (update) {
      return res.json({ msg: 'Cập nhật user thành công.' });
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
    return res.json({
      msg: 'Cập nhật user thành công.',
    });
  }
};
