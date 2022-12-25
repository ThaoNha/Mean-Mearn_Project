const authMethod = require('./auth.methods');
const userMethod = require('../users/users.methods');

const bcrypt = require('bcrypt');
const randToken = require('rand-token');

const jwtVariable = require('../../variables/jwt');
const { SALT_ROUNDS } = require('../../variables/auth');

exports.register = async (req, res) => {
  const { id, username, password, role } = req.body;
  if (!username || !password)
    return res.status(400).send('Hay nhap username and/or password');
  const user = await userMethod.getUserByUsername(username);
  if (user) return res.status(409).send('Ten tai khoan da ton tai.');
  else {
    const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS);
    const newUser = {
      id: id,
      username: username,
      password: hashPassword,
      role: role,
    };
    const createUser = await userMethod.createUser(newUser);
    if (!createUser) {
      return res
        .status(400)
        .send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
    }
    return res.send({ username });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await userMethod.getUserByUsername(username);

  if (user && user.status !== 'active')
    return res.status(401).send('Ten dang nhap hoac mat khau sai!');

  if (!user) return res.status(401).send('Ten dang nhap hoac mat khau sai!');

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid)
    return res.status(401).send('Ten dang nhap hoac mat khau sai!');

  const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  const dataForAccessToken = { username: user.username };

  const accessToken = await authMethod.generateToken(
    dataForAccessToken,
    accessTokenSecret,
    accessTokenLife,
  );
  let refreshToken = randToken.generate(jwtVariable.refreshTokenSize);
  if (!accessToken || !refreshToken) {
    return res
      .status(401)
      .send('Đăng nhập không thành công, vui lòng thử lại.');
  }
  await userMethod.updateToken(user.username, {
    refreshToken: refreshToken,
  });
  return res.json({
    msg: 'Đăng nhập thành công.',
    data: { id: user.id, username, role: user.role.name, status: user.status },
    accessToken,
    refreshToken,
  });
};

exports.refreshToken = async (req, res) => {
  const authHeader = req.header('Authorization');
  const accessTokenFromHeader = authHeader && authHeader.split(' ')[1];
  if (!accessTokenFromHeader) {
    return res.status(400).send('Không tìm thấy access token.');
  }

  const refreshTokenFromBody = req.body.refreshToken;
  if (!refreshTokenFromBody) {
    return res.status(400).send('Không tìm thấy refresh token.');
  }
  const accessTokenSecret =
    process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
  const accessTokenLife =
    process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

  const decoded = await authMethod.decodeToken(
    accessTokenFromHeader,
    accessTokenSecret,
  );
  if (!decoded) {
    return res.status(400).send('Access token không hợp lệ.');
  }
  const username = decoded.payload.username;
  const user = await userMethod.getUserByUsername(username);
  if (!user) {
    return res.status(401).send('User không tồn tại.');
  }
  if (refreshTokenFromBody !== user.refreshToken) {
    return res.status(400).send('Refresh token không hợp lệ.');
  }

  const dataForAccessToken = { username };

  const accessToken = await authMethod.generateToken(
    dataForAccessToken,
    accessTokenSecret,
    accessTokenLife,
  );
  let refreshToken = randToken.generate(jwtVariable.refreshTokenSize);
  if (!accessToken || !refreshToken) {
    return res
      .status(400)
      .send('Tạo access/refresh token không thành công, vui lòng thử lại.');
  }
  await userMethod.updateToken(user.username, {
    refreshToken: refreshToken,
  });
  return res.json({
    accessToken,
    refreshToken,
  });
};
