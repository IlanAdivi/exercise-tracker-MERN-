import _ from 'lodash';
import {
    FETCH_EXERCISES,
    CREATE_EXERCISE,
    DELETE_EXERCISE,
    UPDATE_EXERCISE,
    EXERCISE_ERRORS,
    FETCH_EXERCISE
}
    from "../actions/types";

const Initial_State = {};

export default (state = Initial_State, action) => {
    switch (action.type) {
        case FETCH_EXERCISES:
            if (action.payload.length === 0) {
                return { exercises: {} }
            } else {
                return {
                    exercises: _.mapKeys(action.payload, '_id')
                };
            }
        case CREATE_EXERCISE:
            return {
                exercises: { ...state.exercises, [action.payload._id]: action.payload }
            };
        case DELETE_EXERCISE:
            const exercisesArrayAfterDeleteding = _.omit(state.exercises, action.payload);

            return {
                exercises: exercisesArrayAfterDeleteding
            }
        case UPDATE_EXERCISE:
            return {
                exercises: { ...state.exercises, [action.payload._id]: action.payload }
            };
            case FETCH_EXERCISE:
                return {
                    selectedExercise: action.payload
                }
                case EXERCISE_ERRORS:
                    console.log(action.payload);
                    return {
                        selectedExercise: state.selectedExercise,
                        error: action.payload
                    }
        default:
            return state;
    }
};