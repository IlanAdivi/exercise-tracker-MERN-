const ExerciseService = require('../../services/exercise');

module.exports = {
    createExercise: async (req, res) => {
        // req.log.info('something');
        const { endTime, startTime } = req.body;
        try {
            const userId = req.params.id;
            const newExercise = await ExerciseService.createExercise(req.body, userId);

            res.status(201).json({
                newExercise,
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

        const { endTime, startTime } = req.body;
        const { isValidHour, errorMessageForHours } = ExerciseService.checkingValidationHours(endTime, startTime);
        const { isValidDate, errorMessageForDates } = ExerciseService.checkingValidationDates(req.body);

        // if (!isValidHour || !isValidDate) {
        //     return res.status(400).send({
        //         errors: {
        //             hour: errorMessageForHours,
        //             date: errorMessageForDates
        //         }
        //     });
        // }

        const exerciseId = req.params.id;
        try {
            const exercise = await ExerciseService.updateExercise(req.body, exerciseId, updates);

            res.status(200).send({
                exercise
            });
        } catch (error) {
            res.status(400).send(error);
        }
    }
};