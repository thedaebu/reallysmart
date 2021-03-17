import React from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const mSTP = (state, ownProps) => {
    return ({
        errors: state.errors.sessionErrors,
        formType: 'Sign Up',
        formSubmit: 'Create Account',
        formLink: <Link className='session-form-signup' to='/login'>Log in here.</Link>,
        formLast: 'Already have an account?'
    })
}

const mDTP = (dispatch, ownProps) => {
    return ({
        action: user => dispatch(signup(user))
    })
}

export default connect(mSTP, mDTP)(SessionForm);