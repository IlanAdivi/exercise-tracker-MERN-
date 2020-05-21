import { FETCH_EXERCISE } from "../actions/types";

export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_EXERCISE:
            return action.payload;
        default:
            return state;
    }
};