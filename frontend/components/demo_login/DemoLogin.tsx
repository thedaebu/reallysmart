import React, { Dispatch, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import * as SessionActions from "../../actions/session_actions";
import { AnyAction } from "@reduxjs/toolkit";
import { SessionUser } from "../../my_types";

function DemoLogin() {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    const login: Function = (sessionUser: SessionUser) => dispatch(SessionActions.login(sessionUser));

    function loginWithDemo(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        const demoUser: SessionUser = {
            password: "notsosmart",
            username: "notsosmart"
        };
        
        login(demoUser);
    }

    return (
        <button 
            className="demo-login" 
            onClick={loginWithDemo}
            data-testid="demo-login"
        >
            DEMO
        </button>
    );
}

export default DemoLogin;