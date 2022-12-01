const express = require('express');
const db = require('./utils/connectDB');
const createError = require('http-error');
require('express-async-errors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const authRouter = require('./src/auth/auth.routes');
const userRouter = require('./src/users/users.routes');
const roleRouter = require('./src/roles/roles.routes');
const typeRouter = require('./src/type/type.routes');
const equipmentRouter = require('./src/equipment/equipment.routes');
const historyRouter = require('./src/loan_history/history.routes');

db.connectDB();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/role', roleRouter);
app.use('/api/type', typeRouter);
app.use('/api/equipment', equipmentRouter);
app.use('/api/history', historyRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  console.log(err.stack);
  res.status(err.status || 500).send(err.message);
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Express running -> PORT ${server.address().port}`);
});
