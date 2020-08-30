const express = require('express');
const cors = require('cors');
const path = require('path');
const userRouter = require('./api/routes/user');
const exerciseRouter = require('./api/routes/exercise');

require('./db/mongoose');

const app = express();

app.use(express.json());
app.use(cors({
    origin: `http://localhost:5000`
}));
app.use(userRouter);
app.use(exerciseRouter);

////Disable cache
app.disable('etag');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

module.exports = app;