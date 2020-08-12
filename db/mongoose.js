const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/dev.env' });

const { MONGO_URI } = process.env;

console.log(MONGO_URI);

mongoose.connect(MONGO_URI || 'mongodb+srv://ilan:ilan@cluster0-nxx9v.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});