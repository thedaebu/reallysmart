import { RECEIVE_ANNOTATION } from "../actions/annotation_actions";

const annotationReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_ANNOTATION:
            return Object.assign({}, state, {[action.annotation.id]: action.annotation})
        default:
            return state;
    }
};

export default annotationReducer;