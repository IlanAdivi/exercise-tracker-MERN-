const Exercise = require('../models/exercise');
const User = require('../models/user').User;

module.exports = {
    createExercise: async (exercise, userId) => {
        const {
            course,
            description,
            status,
            completed,
        }
            = exercise;

        const duration = Number(exercise.duration);
        const grade = Number(exercise.grade);
        const date = Date.parse(exercise.date);
        const user = await User.findById(userId);
        exercise = new Exercise({
            user: user,
            course,
            grade,
            description,
            status,
            completed,
            duration,
            date
        });

        await exercise.save();
    },
    getAllExercises: async () => {
        const exercises = await Exercise
            .find()
            .select("-__v -user.__v -user._id");
        if (exercises.length === 0) {
            return {
                message: "There is no exercises now"
            }
        }
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
        const allowedUpdates = ['grade', 'description', 'status', 'completed', 'duration', 'date'];
        const isValidUpdating = updates.every(updateExercise => allowedUpdates.includes(updateExercise));
        return {
            isValidUpdating,
            updates: isValidUpdating === true ? updates : null
        }
    },
    findUpdatingExerciseById: async exerciseId => {
        const exercise = await Exercise.findByIdAndUpdate(exerciseId)
        .select("-__v -user.__v -user._id");
        return exercise;
    },
    saveUpdatingExercise: async exercise => {
        await exercise.save();
    }
};