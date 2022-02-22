import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SessionUser, Window } from "../../my_types";

declare const window: Window;
type Props = {
    clearErrors: Function,
    errors: Array<string>,
    login: Function
}

function LoginForm(props: Props) {
    const { clearErrors, errors, login } = props;

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
        login(user);
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
                            return <li key={idx}>{error}</li>
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
            <h1 className="session-form__login-h1">Log In</h1>
            <form className="session-form__form" onSubmit={handleSignupFormSubmit}>
                {showErrors()}
                <label htmlFor="session-form__username">Really Smart Nickname
                    <input
                        id="session-form__username"
                        onChange={handleInputChange("username")}
                        type="text"
                        value={username}
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
                    />
                </label>
                <input 
                    id="session-form__submit"
                    type="submit"
                    value="Login"
                />
            </form>
            <p className="session-form__bottom">
                Don't have an account? <Link to="/signup">Sign up here.</Link>
            </p>
        </div>
    )
}

export default LoginForm;