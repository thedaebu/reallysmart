import { connect } from "react-redux";
import { State } from "../../my_types";
import { logout } from "../../actions/session_actions";
import SessionMenu from "./session_menu";

const mSTP = (state: State) => {
    return ({
        currentUser: state.entities.user[state.session.id]
    });
};

const mDTP = (dispatch: Function) => ({
    logout: () => dispatch(logout())
});

const SessionMenuContainer = connect(mSTP, mDTP)(SessionMenu);
export default SessionMenuContainer;