import React from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const mSTP = (state, ownProps) => {
    return ({
        errors: state.errors.sessionErrors,
        formType: 'Sign Up',
        formLink: <Link to='/signup'>Sign up here</Link>
    })
}
const mDTP = (dispatch, ownProps) => {
    return ({
        action: user => dispatch(signup(user))
    })
}

export default connect(mSTP, mDTP)(SessionForm);