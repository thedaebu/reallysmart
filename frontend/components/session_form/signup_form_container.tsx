import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup, clearErrors } from "../../actions/session_actions";
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
        formLast: "Already have an account?",
        formLink: <Link to="/login" >Log in here.</Link>,
        formPassword: "",
        formSubmit: "Create Account",
        formTos: <p className="session-form-tos">By clicking “Create Account”, you are indicating that you have read and agree to the <a href="">Terms of Service</a>.</p>,
        formType: <h1 className="session-form-signup-h1">SIGN UP</h1>,
        formTypeSub: <h2 className="session-form-signup-h2">and show off your really smartness</h2>
    })
};

const mDTP = (dispatch: Function) => {
    return ({
        action: (sessionUser: SessionUser) => dispatch(signup(sessionUser)),
        clearErrors: () => dispatch(clearErrors())
    })
};

export default connect(mSTP, mDTP)(SessionForm);