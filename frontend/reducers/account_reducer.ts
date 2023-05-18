import { RECEIVE_ACCOUNT } from "../actions/account_actions";
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";
import { Account, AccountAction, SessionAction } from "../my_types";

const accountsReducer = (state: Account | {} = {}, action: AccountAction | SessionAction) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_ACCOUNT:
            return action.account;
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
};

export default accountsReducer;