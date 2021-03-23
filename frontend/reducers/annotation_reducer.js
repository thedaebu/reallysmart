import { RECEIVE_ANNOTATION } from "../actions/annotation_actions";
import { RECEIVE_TRACK } from "../actions/track_actions";

const annotationReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_TRACK:
            let annotations = {}
            action.annotations.forEach((annotation)=>{
                annotations[annotation.id] = annotation
            })
            debugger
            return Object.assign({}, state, annotations);
        case RECEIVE_ANNOTATION:
            return Object.assign({}, state, {[action.annotation.id]: action.annotation});
        default:
            return state;
    }
};

export default annotationReducer;