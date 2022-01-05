import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { User } from "../../my_types";

type Props = {
    currentUser: User,
    logout: Function
}

function SessionMenu(props: Props) {
    const { currentUser, logout } = props;

    function sessionLogout(e: MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();

        logout();
    }

    if (currentUser !== undefined) {
        return (
            <div className="session-menu">
                {/* <input type="file"/> */}
                {/* <img src={currentUser.avatar_url}/> */}
                <a className="session-menu__logout" onClick={sessionLogout}>LOG OUT</a>
            </div>
        );
    } else {
        return (
            <div className="session-menu">
                <Link to="/signup" className="session-menu__signup">SIGN UP</Link>
                <Link to="/login" className="session-menu__login" >LOG IN</Link>
            </div>
        );
    }
}

export default SessionMenu;
