import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearErrors, login } from "../../actions/session_actions";
import SessionForm from "./session_form";

const mSTP = (state, ownProps) => {
    return ({
        errors: state.errors.sessionErrors,
        formType: <h1 className='session-form-h1-login'>Log In</h1>,
        formTypeSub: '',
        formSubmit: 'Login',
        formLink: <Link className='session-form-login' to='/signup'>Sign up here.</Link>,
        formLast: 'Don\'t have an account?',
        formPassword: '(I forgot my password)'
    })
};

const mDTP = (dispatch, ownProps) => {
    return ({
        action: user => dispatch(login(user)),
        clearErrors: () => dispatch(clearErrors())
    })
};

export default connect(mSTP, mDTP)(SessionForm);