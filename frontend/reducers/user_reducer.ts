import { LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { Action, User } from "../my_types";

const userReducer = (state: {[key: number]: User} = {}, action: Action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, {[action.user.id]: action.user});
        case LOGOUT_CURRENT_USER:
            return Object.assign({});
        default:
            return state;
    }
};

export default userReducer;