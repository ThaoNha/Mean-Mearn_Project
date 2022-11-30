const userMethods = require('./users.methods');

exports.update = async (req, res) => {
  const newData = req.body;
  const username = req.user.username;
  if (newData.username && newData.username != username) {
    return res.status(400).send('Username không hợp lệ.');
  }
  if (newData) {
    await userMethods.updateUser(username, newData);
    return res.json({
      msg: 'Cập nhật user thành công.',
      newData,
    });
  }
};
