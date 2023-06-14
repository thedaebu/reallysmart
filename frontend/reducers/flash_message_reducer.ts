import { SessionAction } from "../my_types";
import { CLEAR_FLASH_MESSAGE } from "../actions/flash_message_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

const flashMessageReducer = (state: string = "", action: SessionAction) => {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return "Log In Successful.";
        case CLEAR_FLASH_MESSAGE:
            return "";
        default:
            return state;
    }
};

export default flashMessageReducer;