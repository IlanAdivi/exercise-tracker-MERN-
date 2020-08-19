const express = require('express');
const cors = require('cors');
const path = require('path');
const userRouter = require('./api/routes/user');
const exerciseRouter = require('./api/routes/exercise');
// const pino = require('pino-http')()

require('./db/mongoose');

const app = express();

// app.use(pino)

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(exerciseRouter);
// app.use(express.static(path.join(__dirname, 'client/build')));
app.disable('etag');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

module.exports = app;