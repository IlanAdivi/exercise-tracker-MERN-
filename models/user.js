const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        minlength: [3, `First Name is shorter than the minimum allowed length`],
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        minlength: [3, `Last Name is shorter than the minimum allowed length`],
        trim: true
    },
    kind: {
        type: String,
        required: true,
        lowercase: true,
        validate: function (kind) {
            const regExpKind = /[student]|[lecturer]/;
            const isValidKind = kind.match(regExpKind);
            if (isValidKind.input !== 'student' && isValidKind.input !== 'lecturer') {
                throw new Error('Kind must be Lecturer or Student');
            }
            return isValidKind;
        }
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: function (phoneNumber) {
            const regExpPhone = /05(0|2|3|4|5|9)\d{7}$/;
            const isValidPhoneNumber = regExpPhone.test(phoneNumber);
            if (!isValidPhoneNumber) {
                throw new Error('Invalid phone number');
            }
            return isValidPhoneNumber;
        }
    },
    imageUrl: { type: String },
    s3_key: { type: String }
});

userSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator',
    message: 'Phone Number must be unique'
});

const User = mongoose.model('User', userSchema);

module.exports = { User, userSchema };