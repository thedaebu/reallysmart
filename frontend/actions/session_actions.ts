import { Dispatch } from "react";
import { AnyAction } from "redux";
import { ReceivedUser, SessionUser, User } from "../my_types";
import * as SessionAPIUtil from "./../util/api/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_ERRORS";

const receiveCurrentUser = ({ user }: {user: User}) => {
    return ({
        type: RECEIVE_CURRENT_USER,
        user
    });
};
const receiveSessionErrors = (errors: Array<string>) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});
const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

export const signup = (sessionUser: SessionUser) => (dispatch: Dispatch<AnyAction>) => {
    return (
        SessionAPIUtil.signup(sessionUser)
            .then((receivedUser: ReceivedUser) => dispatch(receiveCurrentUser(receivedUser)), (errors: JQuery.jqXHR) => dispatch(receiveSessionErrors(errors.responseJSON)))
    );
};
export const login = (sessionUser: SessionUser) => (dispatch: Dispatch<AnyAction>) => {
    return (
        SessionAPIUtil.login(sessionUser)
            .then((receivedUser: ReceivedUser) => dispatch(receiveCurrentUser(receivedUser)), (errors: JQuery.jqXHR) => dispatch(receiveSessionErrors(errors.responseJSON)))
    );
};
export const logout = () => (dispatch: Dispatch<AnyAction>) => {
    return (
        SessionAPIUtil.logout()
            .then(() => dispatch(logoutCurrentUser()))
    );
};
export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
});