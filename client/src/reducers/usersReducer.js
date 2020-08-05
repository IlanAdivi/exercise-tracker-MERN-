import _ from 'lodash';
import {
    FETCH_USERS,
    FETCH_USER,
    CREATE_USER,
    DELETE_USER,
    UPDATE_USER,
    USER_ERRORS
} from '../actions/types';

const Initial_State = {};

export default (state = Initial_State, action) => {
    switch (action.type) {
        case FETCH_USERS:
            if (action.payload.length === 0) {
                return { users: {} }
            } else {
                return {
                    users: _.mapKeys(action.payload, '_id')
                };
            }
        case CREATE_USER:
            return {
                users: { ...state.users, [action.payload._id]: action.payload }
            };
        case DELETE_USER:
            const usersArrayAfterDeleteding = _.omit(state.users, action.payload);

            return {
                users: usersArrayAfterDeleteding
            }
        case UPDATE_USER:
            return {
                users: { ...state.users, [action.payload._id]: action.payload }
            }
        case FETCH_USER:
            return {
                selectedUser: action.payload
            }
        case USER_ERRORS:
            return {
                error: action.payload
            }
        default:
            return state;
    }
};