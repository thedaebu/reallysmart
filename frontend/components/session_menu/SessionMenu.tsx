import React, { Dispatch } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as SessionActions from "../../actions/session_actions";
import { AnyAction } from "@reduxjs/toolkit";
import { State, User } from "../../my_types";

function SessionMenu() {
    const currentUser: User = useSelector((state: State) => state.entities.user);

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const logout: Function = () => dispatch(SessionActions.logout());

    return (
        <section className="session-menu">
            {currentUser ? (
                <>
                    <Link
                        to="/account" 
                        className="session-menu__account"
                        data-testid="session-menu__account"
                    >
                        ACCOUNT
                    </Link>
                    <a 
                        className="session-menu__logout" 
                        onClick={() => logout()}
                        data-testid="session-menu__logout"
                    >
                        LOG OUT
                    </a>
                </>
            ) : (
                <>
                    <Link
                        to="/signup" 
                        className="session-menu__signup"
                        data-testid="session-menu__signup"
                    >
                        SIGN UP
                    </Link>
                    <Link
                        to="/login"
                        className="session-menu__login"
                        data-testid="session-menu__login"
                    >
                        LOG IN
                    </Link>
                </>
            )}
        </section>
    );
}

export default SessionMenu;
