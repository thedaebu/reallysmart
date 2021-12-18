import React, { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";

type Props = {
    action: Function,
    clearErrors: Function,
    errors: Array<string>,
    formType: string
}

function SessionForm(props: Props) {
    const [formLink, setFormLink] = useState(<Link to="/"></Link>);
    const [formLinkQuestion, setFormLinkQuestion] = useState("");
    const [formPasswordMessage, setFormPasswordMessage] = useState("");
    const [formSubmitMessage, setFormSubmitMessage] = useState("");
    const [formSubtitle, setFormSubtitle] = useState(<h2></h2>);
    const [formTitle, setFormTitle] = useState(<h1></h1>);
    const [formTos, setFormTos] = useState(<p></p>);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const { action, clearErrors, errors, formType } = props;

    useEffect(() => {
        window.scrollTo(0, 0);
        clearErrors();
        if (formType === "login") {
            setFormLink(<Link to="/signup">Sign up here.</Link>);
            setFormLinkQuestion("Don\'t have an account?");
            setFormPasswordMessage("(I forgot my password)");
            setFormSubmitMessage("Login");
            setFormTitle(<h1 className="session-form-login-h1">Log In</h1>);
            setFormTos(<p className="session-form-tos">By clicking “Create Account”, you are indicating that you have read and agree to the <a href="">Terms of Service</a>.</p>);
        } else {
            setFormLink(<Link to="/login" >Log in here.</Link>);
            setFormLinkQuestion("Already have an account?");
            setFormSubmitMessage("Create Account");
            setFormSubtitle(<h2 className="session-form-signup-h2">and show off your really smartness</h2>);
            setFormTitle(<h1 className="session-form-signup-h1">SIGN UP</h1>);
            setFormTos(<p className="session-form-tos">By clicking “Create Account”, you are indicating that you have read and agree to the <a href="">Terms of Service</a>.</p>);
        }
    }, []);

    function handleSessionFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const user = {
            password: password,
            username: username
        };
        action(user);
    }

    function handleInputChange(type: string) {
        if (type === "username") {
            return (e: FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);
        } else {
            return (e: FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);
        }
    }

    function showErrors() {
        if (errors.length > 0) {
            return (
                <div className="errors-main">
                    <h2>Ruh-roh!</h2>
                    <p>Something is wrong</p>
                    <ul>
                        {errors.map((error, idx) => {
                            return <li className="error-message" key={idx}>{error}</li>
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
        <div className="session-form-main">
            {formTitle}
            {formSubtitle}                   
            <form className="session-form-form" onSubmit={handleSessionFormSubmit}>
                {showErrors()}
                <label htmlFor="session-form-username" >Really Smart Nickname
                    <input 
                        id="session-form-username" 
                        onChange={handleInputChange("username")}
                        type="text" 
                        value={username} 
                    />
                </label>
                <label htmlFor="session-form-password" >Really Smart Password 
                    <a 
                        className="session-form-forgot-password" 
                        href="" >{formPasswordMessage}
                    </a>
                    <input 
                        id="session-form-password" 
                        onChange={handleInputChange("password")}
                        type="password" 
                        value={password} 
                    />
                </label>
                {formTos}
                <input 
                    id="session-form-submit" 
                    type="submit" 
                    value={formSubmitMessage}
                />                        
            </form>
            <p className="session-form-bottom" >{formLinkQuestion} {formLink}</p>
        </div>
    )
}

export default SessionForm;