import { LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { SessionAction, User } from "../my_types";

const userReducer = (state: {[key: number]: User} = {}, action: SessionAction) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return {[action.user.id]: action.user};
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
};

export default userReducer;