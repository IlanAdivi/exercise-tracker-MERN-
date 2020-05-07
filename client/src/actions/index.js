import axios from 'axios';
import { 
    FETCH_USERS,
    CREATE_USER
 } from './types';

export const fetchUsers = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/users')

    console.log(response);

    dispatch({
        type: FETCH_USERS,
        payload: response.data
    });
}

export const createUser = user => async dispatch => {
    const response = await axios.post('http://localhost:5000/users', user);

    console.log(response);

    dispatch({
        type: CREATE_USER,
        payload: user
    });
};