import { LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { Action } from "../my_types";

const nullUser: {id: number | null} = Object.freeze({
    id: null
});

const sessionReducer = (state: {id: number | null}= nullUser, action: Action) => {
    Object.freeze(state);
        debugger
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, {id: action.user.id});
        case LOGOUT_CURRENT_USER:    
            return Object.assign({}, nullUser);
        default:
            return state;
    }
};

export default sessionReducer;