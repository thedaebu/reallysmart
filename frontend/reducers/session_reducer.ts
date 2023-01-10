import { LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { SessionAction } from "../my_types";

const nullUser: { id: number | null } = Object.freeze({
    id: null
});

const sessionReducer = (state: {id: number | null}= nullUser, action: SessionAction) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return {id: action.user.id};
        case LOGOUT_CURRENT_USER:
            return nullUser;
        default:
            return state;
    }
};

export default sessionReducer;