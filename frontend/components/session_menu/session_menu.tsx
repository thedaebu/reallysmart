import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as SessionActions from "../../actions/session_actions";
import { AnyAction } from "@reduxjs/toolkit";
import { State, User } from "../../my_types";

function SessionMenu() {
    const currentUser: User = useSelector((state: State) => state.entities.user);

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const logout: Function = () => dispatch(SessionActions.logout());

    return (
        <>
            {currentUser 
                ? (
                    <section className="session-menu__user">
                        <a 
                            className="session-menu__logout" 
                            onClick={() => logout()}
                            data-testid="session-menu__logout"
                        >
                            LOG OUT
                        </a>
                    </section>
                ) : (
                    <section className="session-menu__no-user">
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
                    </section>
                )
            }
        </>
    );
}

export default SessionMenu;
