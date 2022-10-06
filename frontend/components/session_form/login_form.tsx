import React, { ChangeEvent, Dispatch, FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as SessionActions from "../../actions/session_actions";
import { SessionUser, State, Window } from "../../my_types";

declare const window: Window;

function LoginForm() {
    const errors: Array<string> = useSelector((state: State) => state.errors.sessionErrors);

    const dispatch: Dispatch<any> = useDispatch();
    const clearSessionErrors: Function = () => dispatch(SessionActions.clearSessionErrors());
    const login: Function = (sessionUser: SessionUser) => dispatch(SessionActions.login(sessionUser));

    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        clearSessionErrors();
        window.scrollTo(0, 0);
    }, [])

    function handleSignupFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const user: SessionUser = {
            password: password,
            username: username
        };
        login(user);
    }

    function handleInputChange(type: string) {
        if (type === "username") {
            return (e: ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);
        } else {
            return (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);
        }
    }

    return (
        <div className="session-form">
            <h1 className="session-form__login-h1">Log In</h1>
            <form className="session-form__form" onSubmit={handleSignupFormSubmit}>
                {errors.length > 0 && (
                    <div className="session-form__errors">
                        <h2>Ruh-roh!</h2>
                        <p>Something is wrong</p>
                        <ul>
                            {errors.map((error: string, idx: number) => {
                                return (
                                    <li key={idx}>{error}</li>
                                );
                            })}
                        </ul>
                    </div>
                )}
                <label htmlFor="session-form__username">Really Smart Nickname
                    <input
                        id="session-form__username"
                        onChange={handleInputChange("username")}
                        type="text"
                        value={username}
                        data-testid="session-form__username"
                    />
                </label>
                <label htmlFor="session-form__password">Really Smart Password
                    <a
                        className="session-form-forgot-password"
                        href="" >(I forgot my password)
                    </a>
                    <input
                        id="session-form__password"
                        onChange={handleInputChange("password")}
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
                Don't have an account? <Link to="/signup" data-testid="signup-form-button">Sign up here.</Link>
            </p>
        </div>
    );
}

export default LoginForm;