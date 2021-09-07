import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup, clearErrors } from "../../actions/session_actions";
import SessionForm from "./session_form";

const mSTP = (state, ownProps) => {
    return ({
        errors: state.errors.sessionErrors,
        formType: <h1 className="session-form-signup-h1">SIGN UP</h1>,
        formTypeSub: <h2 className="session-form-signup-h2">and show off your really smartness</h2>, 
        formSubmit: "Create Account",
        formLink: <Link to="/login" >Log in here.</Link>,
        formLast: "Already have an account?",
        formPassword: "",
        formTos: <p className="session-form-tos">By clicking “Create Account”, you are indicating that you have read and agree to the <a href="">Terms of Service</a>.</p>
    })
};

const mDTP = (dispatch, ownProps) => {
    return ({
        action: user => dispatch(signup(user)),
        clearErrors: () => dispatch(clearErrors())
    })
};

export default connect(mSTP, mDTP)(SessionForm);