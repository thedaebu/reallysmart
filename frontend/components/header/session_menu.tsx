import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";

type Props = {
    currentUser: User,
    logout: Function
}
interface User {
    id: number,
    username: string,
    vote_ids: Array<number>
}

function SessionMenu(props: Props) {
    const { currentUser, logout } = props;

    function sessionLogout(e: MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();

        logout();
    }

    if (currentUser !== undefined) {
        return (
            <div>
                {/* <input type="file"/> */}
                {/* <img src={currentUser.avatar_url}/> */}
                <a className="logout" onClick={sessionLogout}>LOG OUT</a>
            </div>
        );
    } else {
        return (
            <div>
                <Link to="/signup" className="signup">SIGN UP</Link>
                <Link to="/login" className="login" >LOG IN</Link>
            </div>
        );
    }
}

export default SessionMenu;
