import { LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { SessionAction, User } from "../my_types";

const userReducer = (state: User | null = null, action: SessionAction) => {
    Object.freeze(state);

    switch (action.type) {
        case LOGOUT_CURRENT_USER:
            return null;
        case RECEIVE_CURRENT_USER:
            return action.user;
        default:
            return state;
    }
};

export default userReducer;