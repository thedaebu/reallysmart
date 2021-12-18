import { Dispatch } from "react";
import { AnyAction } from "redux";
import { SessionUser, User } from "../types_and_interfaces";
import * as SessionApiUtil from "./../util/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receiveCurrentUser = (user: User) => ({
    type: RECEIVE_CURRENT_USER,
    user
});
const receiveSessionErrors = (errors: Array<string>) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});
const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

export const login = (user: SessionUser) => (dispatch: Dispatch<AnyAction>) => {
    return (
        SessionApiUtil.login(user)
            .then((user: User) => dispatch(receiveCurrentUser(user)), errors => dispatch(receiveSessionErrors(errors.responseJSON)))
    );
};
export const signup = (user: SessionUser) => (dispatch: Dispatch<AnyAction>) => {
    return (
        SessionApiUtil.signup(user)
            .then((user: User) => dispatch(receiveCurrentUser(user)), errors => dispatch(receiveSessionErrors(errors.responseJSON)))
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