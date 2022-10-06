import { RECEIVE_COMMENT_ERRORS } from "../actions/comment_actions";
import { Action } from "../my_types";

const commentErrorsReducer = (state: Array<string> = [], action: Action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_COMMENT_ERRORS:
            return action.errors;
        default:
            return state;
    }
};

export default commentErrorsReducer;