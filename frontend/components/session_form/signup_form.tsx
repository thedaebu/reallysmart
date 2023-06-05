import React, { ChangeEvent, Dispatch, FormEvent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as SessionActions from "../../actions/session_actions";
import { AnyAction } from "@reduxjs/toolkit";
import { SessionAction, SessionUser, Window } from "../../my_types";

declare const window: Window;

function SignupForm() {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    const signup: Function = (sessionUser: SessionUser) => dispatch(SessionActions.signup(sessionUser));

    const [password, setPassword] = useState<string>("");
    const [sessionErrors, setSessionErrors] = useState<Array<string>>([]);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        document.title = "Really Smart";
        window.scrollTo(0, 0);
    }, []);

    function handleSignupSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const user: SessionUser = {
            password: password,
            username: username
        };
        signup(user)
            .then((result: SessionAction) => {
                if (result.type === "RECEIVE_SESSION_ERRORS") {
                    setSessionErrors(result.errors);
                }
            });
    }

    function errorsDisplay() {
        return (
            <div className="session-form__errors">
                <h2 className="session-form__errors--header">Ruh-roh!</h2>
                <p className="session-form__errors--caption">Something is wrong</p>
                <ul className="session-form__errors-list">
                    {sessionErrors.map((sessionError: string, idx: number) => (
                        <li key={idx}>{sessionError}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="session-form">
            <h1 className="session-form__signup--h1">SIGN UP</h1>
            <h2 className="session-form__signup--h2">and show off your really smartness</h2>
            <form className="session-form__form" onSubmit={handleSignupSubmit}>
                {sessionErrors.length > 0 && errorsDisplay()}
                <label className="session-form__label" htmlFor="session-form__username">Really Smart Nickname
                    <input
                        id="session-form__username"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        type="text"
                        value={username}
                        data-testid="session-form__username"
                    />
                </label>
                <label className="session-form__label" htmlFor="session-form__password">Really Smart Password
                    <input
                        id="session-form__password"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        type="password"
                        value={password}
                        data-testid="session-form__password"
                    />
                </label>
                <p className="session-form__tos">
                    By clicking “Create Account”, you are indicating that you have read and agree to the <a href="">Terms of Service</a>.
                </p>
                <input 
                    id="session-form__submit"
                    type="submit"
                    value="Create Account"
                />
            </form>
            <p className="session-form__bottom">
                Already have an account? <Link to="/login" data-testid="login-form-button">Log in here.</Link>
            </p>
        </div>
    );
}

export default SignupForm;