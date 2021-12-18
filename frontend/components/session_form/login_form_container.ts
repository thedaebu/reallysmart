import { connect } from "react-redux";
import { clearErrors, login } from "../../actions/session_actions";
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
        formType: "login"
    })
};

const mDTP = (dispatch: Function) => {
    return ({
        action: (sessionUser: SessionUser) => dispatch(login(sessionUser)),
        clearErrors: () => dispatch(clearErrors())
    })
};

export default connect(mSTP, mDTP)(SessionForm);