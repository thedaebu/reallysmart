import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import DemoUser from "./demo_user";

const mSTP = ({session, entities: { users }}, ownProps) => {
    return ({
        currentUser: users[session.id]
    });
};
const mDTP = (dispatch, ownProps) => {
    return ({
        login: user => dispatch(login(user))
    });
};

export default connect(mSTP, mDTP)(DemoUser);