import React, { useState, useEffect, FormEvent } from "react";

type Props = {
    action: Function,
    clearErrors: Function,
    errors: Array<string>,
    formLast: string,
    formLink: any,
    formPassword: string,
    formSubmit: string,
    formTos: any,
    formType: any,
    formTypeSub: any
}

function SessionForm(props: Props) {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const { action, clearErrors, errors, formLast, formLink, formPassword, formSubmit, formTos, formType, formTypeSub } = props;

    useEffect(() => {
        window.scrollTo(0, 0);
        clearErrors();
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
            {formType}
            {formTypeSub}                   
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
                        href="" >{formPassword}
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
                    value={formSubmit}
                />                        
            </form>
            <p className="session-form-bottom" >{formLast} {formLink}</p>
        </div>
    )
}

export default SessionForm;