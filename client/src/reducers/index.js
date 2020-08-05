import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form'; 
import usersReducer from './usersReducer';
import exercisesReducer from './exercisesReducer';

export const reducers = combineReducers({
    users: usersReducer,
    exercises: exercisesReducer
    //,
    // form: formReducer
});