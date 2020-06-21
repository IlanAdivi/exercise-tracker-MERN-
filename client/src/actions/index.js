import axios from 'axios';
import {
    FETCH_USERS,
    CREATE_USER,
    DELETE_USER,
    UPDATE_USER,
    FETCH_USER,
    FETCH_EXERCISES,
    CREATE_EXERCISE,
    DELETE_EXERCISE,
    UPDATE_EXERCISE,
    FETCH_EXERCISE
} from './types';

const URL = `http://localhost:5000`;

////Users
export const fetchUsers = () => async dispatch => {
    const response = await axios.get(`${URL}/users`);

    dispatch({
        type: FETCH_USERS,
        payload: response.data.users
    });
};

export const fetchUserById = userId => async dispatch => {
    const response = await axios.get(`${URL}/users/${userId}`);

    dispatch({
        type: FETCH_USER,
        payload: response.data.user
    });
};

export const createUser = (user, image) => async dispatch => {
    const response = await axios.post(`${URL}/users`, image, user);
    
    dispatch({
        type: CREATE_USER,
        payload: response.data.newUser
    });
};

export const deleteUser = userId => async dispatch => {
    await axios.delete(`${URL}/users/${userId}`);

    dispatch({
        type: DELETE_USER,
        payload: userId
    });
};

export const updateUser = (userId, userPhone) => async dispatch => {
    const response = await axios.patch(`${URL}/users/${userId}`, { phone: userPhone });

    dispatch({
        type: UPDATE_USER,
        payload: response.data.phone
    });
};


////Exercises
export const fetchExercises = () => async dispatch => {
    const response = await axios.get(`${URL}/exercises`);

    dispatch({
        type: FETCH_EXERCISES,
        payload: response.data.exercises
    });
};

export const fetchExerciseById = exerciseId => async dispatch => {
    const response = await axios.get(`${URL}/exercises/${exerciseId}`);

    dispatch({
        type: FETCH_EXERCISE,
        payload: response.data.exercise
    });
};

export const createExercise = exercise => async dispatch => {
    console.log(exercise);
    const response = await axios.post(`${URL}/exercises/${exercise.userId}`, exercise);

    console.log(response.data.newExercise);

    dispatch({
        type: CREATE_EXERCISE,
        payload: response.data.newExercise
    });
};

export const deleteExercise = exerciseId => async dispatch => {
    await axios.delete(`${URL}/exercises/${exerciseId}`);

    dispatch({
        type: DELETE_EXERCISE,
        payload: exerciseId
    });
};

export const updateExercise = (exercise, exerciseId) => async dispatch => {
    const response = await axios.patch(`${URL}/exercises/${exerciseId}`, exercise);

    dispatch({
        type: UPDATE_EXERCISE,
        payload: response.data.exercise
    });
};