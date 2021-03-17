import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';

const mSTP = (state, ownProps) => {
    return ({
        errors: state.errors.sessionErrors,
        formType: 'Log In',
        formSubmit: 'Login',
        formLink: <Link className='session-form-login' to='/signup'>Sign up here.</Link>,
        formLast: 'Don\'t have an account?'
    })
}
const mDTP = (dispatch, ownProps) => {
    return ({
        action: user => dispatch(login(user))
    })
}

export default connect(mSTP, mDTP)(SessionForm);