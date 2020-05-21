import {
    FETCH_EXERCISES,
    CREATE_EXERCISE,
    DELETE_EXERCISE,
    UPDATE_EXERCISE
}
    from "../actions/types";

const Initial_State = [];

export default (state = Initial_State, action) => {
    switch (action.type) {
        case FETCH_EXERCISES:
            return action.payload;
        case CREATE_EXERCISE:
            return [
                ...state, action.payload
            ];
        case DELETE_EXERCISE:
            return state.filter(exercise => exercise._id !== action.payload);
        case UPDATE_EXERCISE:
            state.grade = action.payload.grade;
            state.description = action.payload.description;
            state.status = action.payload.status;
            state.duration = action.payload.duration;
            state.completed = action.payload.completed;
            return state;
        default:
            return state;
    }
};