import { RECEIVE_ANNOTATION, REMOVE_ANNOTATION } from "../actions/annotation_actions";
import { RECEIVE_COMMENT, REMOVE_COMMENT } from "../actions/comment_actions";
import { CLEAR_FLASH_MESSAGE } from "../actions/flash_message_actions";
import { LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { AnyAction } from "@reduxjs/toolkit";

const flashMessageReducer = (state: string = "", action: AnyAction) => {
    switch (action.type) {
        case CLEAR_FLASH_MESSAGE:
            return "";
        case LOGOUT_CURRENT_USER:
            return action.flashMessage;
        case RECEIVE_ANNOTATION:
            return action.flashMessage;
        case RECEIVE_COMMENT:
            return action.flashMessage;
        case RECEIVE_CURRENT_USER:
            return action.flashMessage;
        case REMOVE_ANNOTATION:
            return action.flashMessage;
        case REMOVE_COMMENT:
            return action.flashMessage;
        default:
            return state;
    }
};

export default flashMessageReducer;