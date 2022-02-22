import { connect } from "react-redux";
import { SessionUser, State } from "../../my_types";
import { clearErrors, login } from "../../actions/session_actions";
import LoginForm from "./login_form";

const mSTP = (state: State) => {
    return ({
        errors: state.errors.sessionErrors
    })
};

const mDTP = (dispatch: Function) => {
    return ({
        clearErrors: () => dispatch(clearErrors()),
        login: (sessionUser: SessionUser) => dispatch(login(sessionUser))
    })
};

const LoginFormContainer = connect(mSTP, mDTP)(LoginForm);
export default LoginFormContainer;