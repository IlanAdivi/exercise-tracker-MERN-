import {
    FETCH_USERS,
    CREATE_USER,
    DELETE_USER,
    UPDATE_USER
} from '../actions/types';

const Initial_State = [];

export default (state = Initial_State, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return action.payload;
        case CREATE_USER:
            return [...state, action.payload];
        case DELETE_USER:
            return state.filter(user =>
                user._id !== action.payload);
        case UPDATE_USER:
            state.phone = action.payload;
            return state;
        default:
            return state;
    }
};