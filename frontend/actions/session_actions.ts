import { Dispatch } from "react";
import { AnyAction } from "redux";
import { ReceivedUser, SessionUser, User } from "../my_types";
import * as SessionAPIUtil from "./../util/api/session_api_util";

export const RECEIVE_CURRENT_USER: string = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER: string = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS: string = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS: string = "CLEAR_SESSION_ERRORS";

const receiveCurrentUser: Function = ({ user }: { user: User }) => ({
    user,
    type: RECEIVE_CURRENT_USER
});
const logoutCurrentUser: Function = () => ({
    type: LOGOUT_CURRENT_USER
});
const receiveSessionErrors: Function = (errors: Array<string>) => ({
    errors,
    type: RECEIVE_SESSION_ERRORS
});
export const clearSessionErrors: Function = () => ({
    type: CLEAR_SESSION_ERRORS
});

export const signup: Function = (sessionUser: SessionUser) => (dispatch: Dispatch<AnyAction>) => (
    SessionAPIUtil.signup(sessionUser)
        .then((receivedUser: ReceivedUser) => dispatch(receiveCurrentUser(receivedUser)), (errors: JQuery.jqXHR) => dispatch(receiveSessionErrors(errors.responseJSON)))
);
export const login: Function = (sessionUser: SessionUser) => (dispatch: Dispatch<AnyAction>) => (
    SessionAPIUtil.login(sessionUser)
        .then((receivedUser: ReceivedUser) => dispatch(receiveCurrentUser(receivedUser)), (errors: JQuery.jqXHR) => dispatch(receiveSessionErrors(errors.responseJSON)))
);
export const logout: Function = () => (dispatch: Dispatch<AnyAction>) => (
    SessionAPIUtil.logout()
        .then(() => dispatch(logoutCurrentUser()))
);