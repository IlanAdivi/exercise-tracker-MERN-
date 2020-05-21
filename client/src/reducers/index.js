import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import selectedUserReducer from './selectedUserReducer';
import exercisesReducer from './exercisesReducer';
import selectedExerciseReducer from './selectedExerciseReducer';

export const reducers = combineReducers({
    users: usersReducer,
    selectedUser: selectedUserReducer,
    exercises: exercisesReducer,
    selectedExercise: selectedExerciseReducer
});