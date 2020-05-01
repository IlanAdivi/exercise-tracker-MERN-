const express = require('express');
const exerciseController = require('../controllers/exercise');
const router = express.Router();

//Routes for Exercises
router.post('/exercises/:id', exerciseController.createExercise);
router.get('/exercises', exerciseController.getAllExercises);
router.get('/exercises/:id', exerciseController.getExerciseById);
router.delete('/exercises/:id', exerciseController.deleteExercise);
router.patch('/exercises/:id', exerciseController.updateExercise);

module.exports = router;