import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import DemoUser from "./demo_user";

type State = {
    entities: Entities,
    session: Session
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
interface SessionUser {
    password: string,
    username: string
}

const mSTP = (state: State) => {
    return ({
        currentUser: state.entities.users[state.session.id]
    });
};
const mDTP = (dispatch: Function) => {
    return ({
        login: (sessionUser: SessionUser) => dispatch(login(sessionUser))
    });
};

export default connect(mSTP, mDTP)(DemoUser);