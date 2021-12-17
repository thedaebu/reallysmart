import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearErrors, login } from "../../actions/session_actions";
import SessionForm from "./session_form";

type State = {
    errors: Errors
}
interface Errors {
    sessionErrors: Array<string>
}
interface SessionUser {
    password: string,
    username: string
}

const mSTP = (state: State) => {
    return ({
        errors: state.errors.sessionErrors,
        formLink: <Link to="/signup">Sign up here.</Link>,
        formPassword: "(I forgot my password)",
        formLast: "Don\'t have an account?",
        formSubmit: "Login",
        formTos: <p></p>,
        formType: <h1 className="session-form-login-h1">Log In</h1>,
        formTypeSub: <h2></h2>
    })
};

const mDTP = (dispatch: Function) => {
    return ({
        action: (sessionUser: SessionUser) => dispatch(login(sessionUser)),
        clearErrors: () => dispatch(clearErrors())
    })
};

export default connect(mSTP, mDTP)(SessionForm);