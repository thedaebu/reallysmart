import { RECEIVE_ANNOTATION_ERRORS } from "../actions/annotation_actions";
import { Action } from "../my_types";

const annotationErrorsReducer = (state: Array<string> = [], action: Action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_ANNOTATION_ERRORS:
            return action.errors;
        default:
            return state;
    }
};

export default annotationErrorsReducer;