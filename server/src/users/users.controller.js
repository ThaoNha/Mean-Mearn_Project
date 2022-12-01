const userMethods = require('./users.methods');

exports.update = async (req, res) => {
  const newData = req.body;
  const userId = req.params.userId;
  if (newData) {
    await userMethods.updateUser(userId, newData);
    return res.json({
      msg: 'Cập nhật user thành công.',
      newData,
    });
  }
};
