import { connect } from "react-redux";
import { State } from "../../my_types";
import { logout } from "../../actions/session_actions";
import SessionMenu from "./session_menu";

const mSTP = (state: State) => ({
    currentUser: state.entities.users[state.session.id]
});

const mDTP = (dispatch: Function) => ({
    logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(SessionMenu);