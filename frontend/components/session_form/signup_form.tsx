import React, { ChangeEvent, Dispatch, FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as SessionActions from "../../actions/session_actions";
import { SessionUser, State, Window } from "../../my_types";

declare const window: Window;

function SignupForm() {
    const errors: Array<string> = useSelector((state: State) => state.errors.sessionErrors);

    const dispatch: Dispatch<any> = useDispatch();
    const clearErrors: Function = () => dispatch(SessionActions.clearErrors());
    const signup: Function = (sessionUser: SessionUser) => dispatch(SessionActions.signup(sessionUser));

    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        clearErrors();
        window.scrollTo(0, 0);
    }, [])

    function handleSignupFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const user: SessionUser = {
            password: password,
            username: username
        };
        signup(user);
    }

    function handleInputChange(type: string) {
        if (type === "username") {
            return (e: ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);
        } else {
            return (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);
        }
    }

    function showErrors() {
        if (errors.length > 0) {
            return (
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
            );
        } else {
            return (
                null
            );
        }
    }

    return (
        <div className="session-form">
            <h1 className="session-form__signup--h1">SIGN UP</h1>
            <h2 className="session-form__signup--h2">and show off your really smartness</h2>
            <form className="session-form__form" onSubmit={handleSignupFormSubmit}>
                {showErrors()}
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
                    <input
                        id="session-form__password"
                        onChange={handleInputChange("password")}
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
                    data-testid="session-form__submit"
                />
            </form>
            <p className="session-form__bottom">
                Already have an account? <Link to="/login" data-testid="login-redirect">Log in here.</Link>
            </p>
        </div>
    );
}

export default SignupForm;