import { RECEIVE_ANNOTATION } from "../actions/annotation_actions";
import { RECEIVE_TRACKS } from "../actions/track_actions";
import { Action, Annotation } from "../my_types";

const annotationsReducer = (state: {[key: number]: Annotation} = {}, action: Action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_TRACKS:
            return Object.assign({});
        case RECEIVE_ANNOTATION:
            return Object.assign({}, state, {[action.annotation.id]: action.annotation});
        default:
            return state;
    }
};

export default annotationsReducer;