import { connect } from "react-redux";
import { SessionUser, State } from "../../my_types";
import { signup, clearErrors } from "../../actions/session_actions";
import SignupForm from "./signup_form";

const mSTP = (state: State) => {
    return ({
        errors: state.errors.sessionErrors
    })
};

const mDTP = (dispatch: Function) => {
    return ({
        clearErrors: () => dispatch(clearErrors()),
        signup: (sessionUser: SessionUser) => dispatch(signup(sessionUser))
    })
};

const SignupFormContainer = connect(mSTP, mDTP)(SignupForm);
export default SignupFormContainer;