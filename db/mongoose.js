const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/dev.env' });

const { MONGO_URI } = process.env;

console.log(MONGO_URI);

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});