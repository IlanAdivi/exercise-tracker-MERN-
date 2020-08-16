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
    FETCH_EXERCISE,
    USER_ERRORS,
    EXERCISE_ERRORS
} from './types';

const URL = `http://localhost:5000`;

////Users
export const fetchUsers = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/users`);
            dispatch({
                type: FETCH_USERS,
                payload: response.data.users
            });

            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
};

export const fetchUserById = userId => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/users/${userId}`);

            dispatch({
                type: FETCH_USER,
                payload: response.data.user
            });
            return response;
        } catch (err) {
            dispatch({
                type: USER_ERRORS,
                payload: err
            });
            return err;
        }
    }
};

export const createUser = user => {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${URL}/users`, user, {
                onUploadProgress: progressEvent => {
                    let uploadPercentage = parseInt(
                        Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    );
                    console.log(uploadPercentage);
                }
            });
            dispatch({
                type: CREATE_USER,
                payload: response.data.newUser
            });
            console.log('response has arrived');

            return response;
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: USER_ERRORS,
                payload: error.response.data
            });
            return error.response.data;
        }
    }
};

export const deleteUser = userId => async dispatch => {
    await axios.delete(`${URL}/users/${userId}`)
        .then(() => {
            dispatch({
                type: DELETE_USER,
                payload: userId
            });
        })
        .catch(err => {
            dispatch({
                type: USER_ERRORS,
                payload: err.response
            });
        })
};

export const updateUser = (userId, userPhone) => {
    return async function (dispatch) {
        try {
            const response = await axios.patch(`${URL}/users/${userId}`, { phone: userPhone })
            dispatch({
                type: UPDATE_USER,
                payload: response.data
            });

            return response;
        } catch (err) {
            dispatch({
                type: USER_ERRORS,
                payload: err.response.data.errors
            });

            return err.response.data.errors;
        }
    }
};


////Exercises
export const fetchExercises = () => async dispatch => {
    const response = await axios.get(`/exercises`);

    dispatch({
        type: FETCH_EXERCISES,
        payload: response.data.exercises
    });
};

export const fetchExerciseById = exerciseId => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/exercises/${exerciseId}`);
            dispatch({
                type: FETCH_EXERCISE,
                payload: response.data.exercise
            });
            return response;
        } catch (err) {
            dispatch({
                type: EXERCISE_ERRORS,
                payload: err
            });
            return err;
        }
    }
};

export const createExercise = (exercise, userId) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${URL}/exercises/${userId}`, exercise);

            dispatch({
                type: CREATE_EXERCISE,
                payload: response.data.newExercise
            });
            return response;
        } catch (err) {
            dispatch({
                type: EXERCISE_ERRORS,
                payload: err.response
            });

            return err.response;
        }
    }
};

export const deleteExercise = exerciseId => async dispatch => {
    await axios.delete(`${URL}/exercises/${exerciseId}`);

    dispatch({
        type: DELETE_EXERCISE,
        payload: exerciseId
    });
};

export const updateExercise = (exercise, exerciseId) => {
    return async function (dispatch) {
        try {
            const response = await axios.patch(`${URL}/exercises/${exerciseId}`, exercise);

            dispatch({
                type: UPDATE_EXERCISE,
                payload: response.data.exercise
            });
            return response;
        } catch (error) {
            dispatch({
                type: EXERCISE_ERRORS,
                payload: error.response.data.errors
            });
            return error.response.data.errors;
        }
    }
};