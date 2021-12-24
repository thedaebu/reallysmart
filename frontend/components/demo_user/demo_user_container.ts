import { connect } from "react-redux";
import { SessionUser, State } from "../../my_types";
import { login } from "../../actions/session_actions";
import DemoUser from "./demo_user";

const mSTP = (state: State) => {
    return ({
        currentUser: state.entities.user[state.session.id]
    });
};
const mDTP = (dispatch: Function) => {
    return ({
        login: (sessionUser: SessionUser) => dispatch(login(sessionUser))
    });
};

export default connect(mSTP, mDTP)(DemoUser);