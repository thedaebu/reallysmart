import React from "react";
import { Link } from "react-router-dom";

function SessionMenu(props) {
    const { currentUser, logout } = props;

    if (currentUser !== undefined) {
        return (
            <div>
                {/* <input type="file"/> */}
                {/* <img src={currentUser.avatar_url}/> */}
                <a className="logout" onClick={logout}>LOG OUT</a>
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
