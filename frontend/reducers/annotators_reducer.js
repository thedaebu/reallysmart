import { RECEIVE_TRACK } from "../actions/track_actions";


const annotatorsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_TRACK:
            return Object.assign({}, state, action.annotators);
        default:
            return state;
    }
}

export default annotatorsReducer;