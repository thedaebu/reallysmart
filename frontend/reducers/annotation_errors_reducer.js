import { RECEIVE_ANNOTATION_ERRORS } from "../actions/annotation_actions";

const annotationErrorsReducer = (state = [], action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_ANNOTATION_ERRORS:
            return action.errors;
        default:
            return null;
    }
}

export default annotationErrorsReducer;