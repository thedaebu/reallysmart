import { RECEIVE_TRACKS } from "../actions/track_actions"
import { RECEIVE_COMMENT } from "../actions/comment_actions";
import { Action, Comment } from "../my_types";

const commentsReducer = (state: {[key: number]: Comment} = {}, action: Action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_TRACKS:
            return Object.assign({});
        case RECEIVE_COMMENT:
            return Object.assign({}, state, {[action.comment.id]: action.comment});
        default:
            return state;
    }
};

export default commentsReducer;