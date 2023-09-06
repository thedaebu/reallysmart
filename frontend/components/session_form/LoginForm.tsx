import React, { ChangeEvent, Dispatch, FormEvent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";
import { SessionAction, SessionUser, Window } from "../../my_types";
import * as SessionActions from "../../actions/session_actions";

declare const window: Window;

function LoginForm() {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    const login: Function = (sessionUser: SessionUser) => dispatch(SessionActions.login(sessionUser));

    const navigate: NavigateFunction = useNavigate();

    const [errors, setErrors] = useState<Array<string>>([]);
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        document.title = "Really Smart";
        window.scrollTo(0, 0);
    }, []);

    function handleLoginSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const user: SessionUser = {
            password: password,
            username: username
        };
        login(user)
            .then((result: SessionAction) => {
                if (result.type === "RECEIVE_SESSION_ERRORS") {
                    setErrors(result.errors);
                } else {
                    navigate(-2);
                }
            });
    }

    function errorsDisplay() {
        return (
            <div className="session-form__errors">
                <h2 className="session-form__errors__header">Ruh-roh!</h2>
                <p className="session-form__errors__caption">Something is wrong</p>
                <ul className="session-form__errors-list">
                    {errors.map((sessionError: string, idx: number) => (
                        <li key={idx}>{sessionError}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="session-form">
            <h1 className="session-form__login-h1">Log In</h1>
            <form className="session-form__form" onSubmit={handleLoginSubmit}>
                {errors.length > 0 && errorsDisplay()}
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
                    <a className="session-form__forgot-password" href="">
                        (I forgot my password)
                    </a>
                    <input
                        id="session-form__password"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        type="password"
                        value={password}
                        data-testid="session-form__password"
                    />
                </label>
                <input 
                    id="session-form__submit"
                    type="submit"
                    value="Login"
                />
            </form>
            <p className="session-form__bottom">
                Don't have an account? <Link to="/signup" data-testid="signup-form__button">Sign up here.</Link>
            </p>
        </div>
    );
}

export default LoginForm;