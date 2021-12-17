import { RECEIVE_ANNOTATION } from "../actions/annotation_actions";
import { RECEIVE_TRACK, RECEIVE_TRACKS } from "../actions/track_actions";

const annotationsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_TRACK:
            return Object.assign({}, action.annotations);
        case RECEIVE_TRACKS:
            return Object.assign({});
        case RECEIVE_ANNOTATION:
            return Object.assign({}, state, {[action.annotation.id]: action.annotation});
        default:
            return state;
    }
};

export default annotationsReducer;