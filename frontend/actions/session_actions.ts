import { Dispatch } from "react";
import * as UserAPIUtil from "./../util/api/user_api_util";
import * as SessionAPIUtil from "./../util/api/session_api_util";
import { ReceivedUser, SessionAction, SessionUser, UpdatedUser, User } from "../my_types";

export const LOGOUT_CURRENT_USER: string = "LOGOUT_CURRENT_USER";
export const RECEIVE_CURRENT_USER: string = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS: string = "RECEIVE_SESSION_ERRORS";

const receiveCurrentUser: Function = ({ user }: { user: User; }, flashMessage: string = "") => ({
    flashMessage,
    user,
    type: RECEIVE_CURRENT_USER
});
const logoutCurrentUser: Function = (flashMessage: string = "") => ({
    flashMessage,
    type: LOGOUT_CURRENT_USER
});
const receiveSessionErrors: Function = (errors: Array<string>) => ({
    errors,
    type: RECEIVE_SESSION_ERRORS
});

export const login: Function = (sessionUser: SessionUser) => (dispatch: Dispatch<SessionAction>) => (
    SessionAPIUtil.login(sessionUser)
        .then((receivedUser: ReceivedUser) => dispatch(receiveCurrentUser(receivedUser, "Log In Successful.")), (errors: JQuery.jqXHR) => receiveSessionErrors(errors.responseJSON))
);
export const logout: Function = () => (dispatch: Dispatch<SessionAction>) => (
    SessionAPIUtil.logout()
        .then(() => dispatch(logoutCurrentUser("Log Out Successful.")))
);
export const signup: Function = (sessionUser: SessionUser) => (dispatch: Dispatch<SessionAction>) => (
    SessionAPIUtil.signup(sessionUser)
        .then((receivedUser: ReceivedUser) => dispatch(receiveCurrentUser(receivedUser, "Sign Up Successful.")), (errors: JQuery.jqXHR) => receiveSessionErrors(errors.responseJSON))
);
export const updateUser: Function = (updatedUser: UpdatedUser) => (dispatch: Dispatch<SessionAction>) => (
    UserAPIUtil.updateUser(updatedUser)
        .then((receivedUser: ReceivedUser) => dispatch(receiveCurrentUser(receivedUser, "User Update Successful.")), (errors: JQuery.jqXHR) => receiveSessionErrors(errors.responseJSON))
);