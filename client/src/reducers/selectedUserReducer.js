import { FETCH_USER } from '../actions/types';

const Initial_State = {};

export default (state = Initial_State, action) => {
    switch(action.type) {
        case FETCH_USER:
            return action.payload;
        default:
            return state;
    }
};