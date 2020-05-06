const express = require('express');
const cors = require('cors');

const userRouter = require('./api/routes/user');
const exerciseRouter = require('./api/routes/exercise');

require('./db/mongoose');

const app = express();
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(exerciseRouter);

module.exports = app;