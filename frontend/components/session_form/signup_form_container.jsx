import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup, clearErrors } from "../../actions/session_actions";
import SessionForm from "./session_form";

const mSTP = (state, ownProps) => {
    return ({
        errors: state.errors.sessionErrors,
        formType: <h1 className="session-form-h1-signup">SIGN UP</h1>,
        formTypeSub: <h2 className="session-form-h2-signup">and show off your really smartness</h2>, 
        formSubmit: "Create Account",
        formLink: <Link className="session-form-signup" to="/login" >Log in here.</Link>,
        formLast: "Already have an account?",
        formPassword: "",
        formTos: <p className="session-form-tos-agree">By clicking “Create Account”, you are indicating that you have read and agree to the <a className="session-form-tos-link" href="">Terms of Service</a>.</p>
    })
};

const mDTP = (dispatch, ownProps) => {
    return ({
        action: user => dispatch(signup(user)),
        clearErrors: () => dispatch(clearErrors())
    })
};

export default connect(mSTP, mDTP)(SessionForm);