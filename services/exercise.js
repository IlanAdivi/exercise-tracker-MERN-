const Exercise = require('../models/exercise');
const User = require('../models/user').User;
const TimesService = require('./time');
const TwilioService = require('./twilio');

const findUpdatingExerciseById = async exerciseId => {
    const exercise = await Exercise.findByIdAndUpdate(exerciseId)
        .select("-__v -user.__v -user._id");

    return exercise;
};

const makeUpdateExercise = (requestBodyKeysForUpdateExercise, requestBodyUpdateExercise, exercise) => {
    requestBodyKeysForUpdateExercise.map(requestBodyKeysForUpdateExercise => {
        switch (requestBodyKeysForUpdateExercise) {
            case 'date':
                exercise[requestBodyKeysForUpdateExercise] = TimesService.dateOfExercise(requestBodyUpdateExercise);
                break;
            case 'startTime':
                exercise[requestBodyKeysForUpdateExercise] = TimesService.startTimeOfExercise(requestBodyUpdateExercise);
                break;
            case 'endTime':
                exercise[requestBodyKeysForUpdateExercise] = TimesService.endTimeOfExercise(requestBodyUpdateExercise);
                break;
            default:
                exercise[requestBodyKeysForUpdateExercise] = requestBodyUpdateExercise[requestBodyKeysForUpdateExercise]
                break;
        }
    }
    );
};

const checkingValidationHours = (endTime, startTime) => {
    const isValid = TimesService.validDuration(endTime, startTime);
    let message = '';
    if (isValid === false) {
        message = 'Invalid Start Time and End Time of exam';
    }

    return {
        errorMessageForHours: message,
        isValidHour: isValid
    };
};

const checkingValidationDates = exercise => {
    const isValid = TimesService.validDate(exercise);
    let message = '';
    if (isValid === false) {
        message = 'Please select a valid date';
    }

    return {
        isValidDate: isValid,
        errorMessageForDates: message
    };
};

const checkingValidationCourse = course => {
    let isValidCourse = false;
    if (course.length >= 3) {
        isValidCourse = true;
    }

    return isValidCourse;
};

module.exports = {
    createExercise: async (exercise, userId) => {
        const { course } = exercise;
        const isValidCourse = checkingValidationCourse(course);
        let { endTime, startTime } = exercise;
        const { isValidHour, errorMessageForHours } = checkingValidationHours(endTime, startTime);
        const { isValidDate, errorMessageForDates } = checkingValidationDates(exercise);
        const user = await User.findById(userId);
        const date = TimesService.dateOfExercise(exercise);
        startTime = TimesService.startTimeOfExercise(exercise);
        endTime = TimesService.endTimeOfExercise(exercise);

        exercise = new Exercise({
            user,
            course,
            startTime,
            endTime,
            date
        });
        try {
            if ((!isValidHour
                || !isValidDate)
                && isValidCourse) {
                throw {
                    hour: errorMessageForHours,
                    date: errorMessageForDates
                };
            }

            const { phone } = user;
            const newExercise = await exercise.save();
            const welcomeMessage = TwilioService.createWelcomeMessageToClient(user, exercise);
            TwilioService.sendingSMSToClient(phone, welcomeMessage);
            return newExercise;
        } catch (err) {
            if (err.errors) {
                err = {
                    course: err.errors.course.message,
                    hour: errorMessageForHours,
                    date: errorMessageForDates
                };
            }
            throw {
                errors: err
            }
        }
    },
    getAllExercises: async () => {
        const exercises = await Exercise
            .find()
            .select("-__v -user.__v -user._id");
        return exercises;
    },
    getExerciseById: async exerciseId => {
        const exercise = await Exercise.findById(exerciseId)
            .select("-__v -user.__v -user._id");
        return exercise;
    },
    deleteExerciseById: async exerciseId => {
        const exercise = await Exercise.findByIdAndDelete(exerciseId);
        return exercise;
    },
    checkIfIsValidUpdatingExercise: exerciseRequestBody => {
        const updates = Object.keys(exerciseRequestBody);
        const allowedUpdates = ['duration', 'startTime', 'endTime', 'date'];
        const isValidUpdating = updates.every(updateExercise => allowedUpdates.includes(updateExercise));
        return {
            isValidUpdating,
            updates: isValidUpdating === true ? updates : null
        }
    },
    updateExercise: async (exerciseFromRequestBody, exerciseId, requestBodyKeysForUpdateExercise) => {
        const exercise = await findUpdatingExerciseById(exerciseId);
        makeUpdateExercise(requestBodyKeysForUpdateExercise, exerciseFromRequestBody, exercise);
        const welcomeMessage = TwilioService.updateMessageToClient(exercise);
        const { phone } = exercise.user;
        TwilioService.sendingSMSToClient(phone, welcomeMessage);
        await exercise.save();
        return exercise;
    },
    checkingValidationHours,
    checkingValidationDates
}

    // ,
//     checkingValidationHours: (endTime, startTime) => {
//         const isValid = TimesService.validDuration(endTime, startTime);
//         let message = '';
//         if (isValid === false) {
//             message = 'Invalid Start Time and End Time of exam';
//         }

//         return {
//             errorMessageForHours: message,
//             isValidHour: isValid
//         };
//     },
//     checkingValidationDates: exercise => {
//         const isValid = TimesService.validDate(exercise);
//         let message = '';
//         if (isValid === false) {
//             message = 'Please select a valid date';
//         }

//         return {
//             isValidDate: isValid,
//             errorMessageForDates: message
//         };
//     }
// }
