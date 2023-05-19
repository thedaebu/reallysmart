import { Dispatch } from "react";
import * as UserAPIUtil from "./../util/api/user_api_util";
import * as SessionAPIUtil from "./../util/api/session_api_util";
import { ReceivedUser, SessionAction, SessionUser, UpdatedUser, User } from "../my_types";

export const RECEIVE_CURRENT_USER: string = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER: string = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS: string = "RECEIVE_SESSION_ERRORS";

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

export const fetchUser: Function = (sessionToken: string) => (dispatch: Dispatch<SessionAction>) => (
    UserAPIUtil.fetchUser(sessionToken)
        .then((receivedUser: ReceivedUser) => dispatch(receiveCurrentUser(receivedUser)), (errors: JQuery.jqXHR) => receiveSessionErrors(errors.responseJSON))
);
export const updateUser: Function = (updatedUser: UpdatedUser) => (dispatch: Dispatch<SessionAction>) => (
    UserAPIUtil.updateUser(updatedUser)
        .then((receivedUser: ReceivedUser) => dispatch(receiveCurrentUser(receivedUser)), (errors: JQuery.jqXHR) => receiveSessionErrors(errors.responseJSON))
);
export const signup: Function = (sessionUser: SessionUser) => (dispatch: Dispatch<SessionAction>) => (
    SessionAPIUtil.signup(sessionUser)
        .then((receivedUser: ReceivedUser) => dispatch(receiveCurrentUser(receivedUser)), (errors: JQuery.jqXHR) => receiveSessionErrors(errors.responseJSON))
);
export const login: Function = (sessionUser: SessionUser) => (dispatch: Dispatch<SessionAction>) => (
    SessionAPIUtil.login(sessionUser)
        .then((receivedUser: ReceivedUser) => dispatch(receiveCurrentUser(receivedUser)), (errors: JQuery.jqXHR) => receiveSessionErrors(errors.responseJSON))
);
export const logout: Function = () => (dispatch: Dispatch<SessionAction>) => (
    SessionAPIUtil.logout()
        .then(() => dispatch(logoutCurrentUser()))
);