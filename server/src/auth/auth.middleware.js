const userModel = require('../users/users.methods');

const authMethod = require('./auth.methods');

exports.isAuth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
	const accessTokenFromHeader = authHeader && authHeader.split(' ')[1];
  if (!accessTokenFromHeader) {
    return res.status(401).send('Không tìm thấy access token!');
  }
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  const verified = await authMethod.verifyToken(
    accessTokenFromHeader,
    accessTokenSecret,
  );
  if (!verified) {
    return res
      .status(401)
      .send('Bạn không có quyền truy cập vào tính năng này!');
  }

  const user = await userModel.getUserByUsername(verified.payload.username);
  user.password = null;
  user.refreshToken = null;
  req.user = user;
  return next();
};

exports.isManager = async (req, res, next) => {
  if(req.user.role.name === 'manager') return next();
  else {
    return res
    .status(401)
    .send('Bạn không có quyền thực hiện tính năng này!');
  }
}
