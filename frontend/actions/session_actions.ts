import { Dispatch } from "react";
import { AnyAction } from "redux";
import { ReceivedUser, SessionUser } from "../my_types";
import * as SessionApiUtil from "./../util/api/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receiveCurrentUser = (receivedUser: ReceivedUser) => {
    return ({
        type: RECEIVE_CURRENT_USER,
        user: receivedUser.user
    });
};
const receiveSessionErrors = (errors: Array<string>) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});
const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

export const login = (sessionUser: SessionUser) => (dispatch: Dispatch<AnyAction>) => {
    return (
        SessionApiUtil.login(sessionUser)
            .then((receivedUser: ReceivedUser) => dispatch(receiveCurrentUser(receivedUser)), errors => dispatch(receiveSessionErrors(errors.responseJSON)))
    );
};
export const signup = (sessionUser: SessionUser) => (dispatch: Dispatch<AnyAction>) => {
    return (
        SessionApiUtil.signup(sessionUser)
            .then((receivedUser: ReceivedUser) => dispatch(receiveCurrentUser(receivedUser)), errors => dispatch(receiveSessionErrors(errors.responseJSON)))
    );
};
export const logout = () => (dispatch: Dispatch<AnyAction>) => {
    return (
        SessionApiUtil.logout()
            .then(() => dispatch(logoutCurrentUser()))
    );
};
export const clearErrors = () => ({
    type: CLEAR_ERRORS
});