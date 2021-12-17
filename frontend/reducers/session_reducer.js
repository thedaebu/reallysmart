import { LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER } from "../actions/session_actions";

const nullUser = Object.freeze({
    id: null
});

const sessionReducer = (state = nullUser, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, {id: action.user.id});
        case LOGOUT_CURRENT_USER:    
            return Object.assign({}, {id: null});
        default:
            return state;
    }
};

export default sessionReducer;