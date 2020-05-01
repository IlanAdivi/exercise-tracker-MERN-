const ExerciseService = require('../../services/exercise');

module.exports = {
    createExercise: async (req, res) => {
        try {
            const userId = req.params.id;
            await ExerciseService.createExercise(req.body, userId);

            res.status(201).json({
                Success: "new exercise created"
            });
        } catch (error) {
            res.status(400).send(error);
        }
    },
    getAllExercises: async (req, res) => {
        try {
            const exercises = await ExerciseService.getAllExercises();
            res.status(200).send({ exercises });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getExerciseById: async (req, res) => {
        const exerciseId = req.params.id;
        try {
            const exercise = await ExerciseService.getExerciseById(exerciseId);
            if (!exercise) {
                return res.status(404).send({
                    error: "Exercise doesn't exist"
                });
            }
            res.status(200).send({ exercise });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    deleteExercise: async (req, res) => {
        try {
            const exerciseId = req.params.id;
            const exercise = await ExerciseService.deleteExerciseById(exerciseId);
            if (!exercise) {
                return res.status(404).json({
                    error: "Exercise doesn't exist"
                });
            }
            res.status(200).send({ Success: "Exercise deleted successfully" });
        } catch (error) {
            res.status(400).send(error);
        }
    },
    updateExercise: async (req, res) => {
        const { isValidUpdating, updates } = ExerciseService.checkIfIsValidUpdatingExercise(req.body);

        if (!isValidUpdating) {
            return res.status(400).send({
                error: "Invalid updates"
            });
        }

        const exerciseId = req.params.id;
        try {
            const exercise = await ExerciseService.findUpdatingExerciseById(exerciseId);

            updates.map(updateExercise =>
                exercise[updateExercise] = req.body[updateExercise]
            );
            await ExerciseService.saveUpdatingExercise(exercise);
            res.status(200).send({
                exercise
            });
        } catch (error) {
            res.status(400).send(error);
        }
    }
};