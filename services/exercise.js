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
                console.log(requestBodyUpdateExercise);
                console.log(exercise);
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

module.exports = {
    createExercise: async (exercise, userId) => {
        const {
            course,
            // description,
            // status,
            // completed,
            // messageTo
        }
            = exercise;

        // const grade = Number(exercise.grade);
        const duration = Number(exercise.duration);
        const user = await User.findById(userId);
        const date = TimesService.dateOfExercise(exercise);
        const startTime = TimesService.startTimeOfExercise(exercise);
        const endTime = TimesService.endTimeOfExercise(exercise);

        exercise = new Exercise({
            user,
            course,
            // grade,
            // description,
            // status,
            // completed,
            duration,
            startTime,
            endTime,
            date
        });

        const { phone } = user;
        const welcomeMessage = TwilioService.createWelcomeMessageToClient(user, exercise);
        TwilioService.sendingSMSToClient(phone, welcomeMessage);
        const newExercise = await exercise.save();

        return newExercise;
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
        TwilioService.sendingSMSToClient(exercise.user.phone, welcomeMessage);
        await exercise.save();

        return exercise;
    }
};