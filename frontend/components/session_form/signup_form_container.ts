import { connect } from "react-redux";
import { SessionUser, State } from "../../my_types";
import { signup, clearErrors } from "../../actions/session_actions";
import SessionForm from "./session_form";

const mSTP = (state: State) => {
    return ({
        errors: state.errors.sessionErrors,
        formType: "signup"
    })
};

const mDTP = (dispatch: Function) => {
    return ({
        action: (sessionUser: SessionUser) => dispatch(signup(sessionUser)),
        clearErrors: () => dispatch(clearErrors())
    })
};

export default connect(mSTP, mDTP)(SessionForm);