import {
    FETCH_USERS,
    CREATE_USER
} from '../actions/types';

// const initialState = {
//     usersData: {}
// };

export const usersData = (state = null, action) => {
    console.log(action.type);
    switch (action.type) {
        case FETCH_USERS:
            return action.payload;
        case CREATE_USER:
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
};