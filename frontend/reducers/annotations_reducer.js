import { RECEIVE_ANNOTATION } from "../actions/annotation_actions";
import { RECEIVE_TRACK } from "../actions/track_actions";

const annotationsReducer = (state = {}, action) => {
    Object.freeze(state);
    
    switch (action.type) {
        case RECEIVE_TRACK:
            let annotations = {}
            if (action.annotations instanceof Array) {
                action.annotations.forEach((annotation)=>{
                    annotations[annotation.id] = annotation
                })

            } else {
                annotations = action.annotations;
            }
            
            return Object.assign({}, annotations);
        case RECEIVE_ANNOTATION:   
            return Object.assign({}, state, {[action.annotation.id]: action.annotation});
        default:
            return state;
    }
};

export default annotationsReducer;