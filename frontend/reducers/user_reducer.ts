import { LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { SessionAction, User } from "../my_types";

const userReducer = (state: User | null = null, action: SessionAction) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return action.user;
        case LOGOUT_CURRENT_USER:
            return null;
        default:
            return state;
    }
};

export default userReducer;