import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import SessionMenu from "./session_menu";

type State = {
    session: Session,
    entities: Entities
}
interface Entities {
    users: UserKey
}
interface UserKey {
    [key: number]: User
}
interface User {
    id: number,
    username: string,
    vote_ids: Array<number>
}
interface Session {
    id: number
}

const mSTP = (state: State) => ({
    currentUser: state.entities.users[state.session.id]
});

const mDTP = (dispatch: Function) => ({
    logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(SessionMenu);