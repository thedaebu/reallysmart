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
interface User {
    id: number,
    username: string,
    vote_ids: Array<number>
}

const mSTP = (state: State) => {
    return ({
        errors: state.errors.sessionErrors,
        formType: <h1 className="session-form-login-h1">Log In</h1>,
        formTypeSub: <h2></h2>,
        formSubmit: "Login",
        formLink: <Link to="/signup">Sign up here.</Link>,
        formLast: "Don\'t have an account?",
        formPassword: "(I forgot my password)",
        formTos: <p></p>
    })
};

const mDTP = (dispatch: Function) => {
    return ({
        action: (user: User) => dispatch(login(user)),
        clearErrors: () => dispatch(clearErrors())
    })
};

export default connect(mSTP, mDTP)(SessionForm);