const mongoose = require('mongoose');
const userSchema = require('./user').userSchema;

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    user: userSchema,
    course: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    grade: {
        type: Number,
        required: true,
        validate: function (grade) {
            if (grade < 0) {
                throw new Error("Grade cannot be less than zero");
            }
            return grade;
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 4
    },
    status: {
        type: String,
        required: true,
        lowercase: true,
        validate: function (status) {
            const regExpStatus = /[unchecked]|[in process]|[checked]/;
            const isValidStatus = status.match(regExpStatus);
            if (!isValidStatus) {
                throw new Error("Status must be unchecked or in process or checked")
            }
            return status;
        }
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
},
    {
        timestamps: true
    });

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;