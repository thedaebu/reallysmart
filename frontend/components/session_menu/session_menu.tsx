import React, { Dispatch, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as SessionActions from "../../actions/session_actions";
import { State, User } from "../../my_types";

function SessionMenu() {
    const currentUser: User = useSelector((state: State) => state.entities.user[state.session.id]);

    const dispatch: Dispatch<any> = useDispatch();
    const logout: Function = () => dispatch(SessionActions.logout());

    function sessionMenuButtons() {
        if (!currentUser) {
            return (
                <div className="session-menu">
                    <Link to="/signup" className="session-menu__signup">SIGN UP</Link>
                    <Link to="/login" className="session-menu__login" >LOG IN</Link>
                </div>
            );
        } else {
            return (
                <div className="session-menu">
                    {/* <input type="file"/> */}
                    {/* <img src={currentUser.avatar_url} /> */}
                    <a className="session-menu__logout" onClick={sessionLogout}>LOG OUT</a>
                </div>
            );
        }
    }

    function sessionLogout(e: MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();

        logout();
    }

    return (
        <>
            {sessionMenuButtons()}
        </>
    );
}

export default SessionMenu;
