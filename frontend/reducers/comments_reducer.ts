import { RECEIVE_TRACK, RECEIVE_TRACKS } from "../actions/track_actions"
import { RECEIVE_COMMENT, REMOVE_COMMENT } from "../actions/comment_actions";
import { Comment, CommentAction, TrackAction } from "../my_types";

const commentsReducer = (state: {[key: number]: Comment} = {}, action: CommentAction | TrackAction) => {
    Object.freeze(state);
    const newState: {[key: number]: Comment} = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_TRACKS:
            return {};
        case RECEIVE_TRACK:
            return action.comments;
        case RECEIVE_COMMENT:
            return {...state, [action.comment.id]: action.comment};
        case REMOVE_COMMENT:
            delete newState[action.commentId];
            return newState;
        default:
            return state;
    }
};

export default commentsReducer;