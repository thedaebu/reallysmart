import { RECEIVE_TRACK, RECEIVE_TRACKS } from "../actions/track_actions"
import { RECEIVE_COMMENT, REMOVE_COMMENT } from "../actions/comment_actions";
import { AnyAction } from "@reduxjs/toolkit";
import { Comment } from "../my_types";

const commentsReducer = (state: { [key: number]: Comment; } = {}, action: AnyAction) => {
    Object.freeze(state);
    const newState: { [key: number]: Comment; } = {...state};

    switch (action.type) {
        case RECEIVE_COMMENT:
            return {...newState, [action.comment.id]: action.comment};
        case RECEIVE_TRACK:
            return action.comments;
        case RECEIVE_TRACKS:
            return {};
        case REMOVE_COMMENT:
            delete newState[action.commentId];
            return newState;
        default:
            return state;
    }
};

export default commentsReducer;