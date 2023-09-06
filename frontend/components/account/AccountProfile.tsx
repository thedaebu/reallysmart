import React, { ChangeEvent, Dispatch, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import * as SessionActions from "../../actions/session_actions"
import { AnyAction } from "@reduxjs/toolkit";
import { SessionAction, UpdatedUser } from "../../my_types";

type TargetData = {
    target: {
        dataset: {
            formname: string;
        };
    };
} & FormEvent<HTMLFormElement>;

function AccountProfile({ username }: { username: string; }) {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    const updateUser: Function = (updatedUser: UpdatedUser) => dispatch(SessionActions.updateUser(updatedUser));

    const [confirmedNewPassword, setConfirmedNewPassword] = useState<string>("");
    const [confirmedOldPassword, setConfirmedOldPassword] = useState<string>("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [newUsername, setNewUsername] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordErrors, setPasswordErrors] = useState<Array<string>>([]);
    const [usernameErrors, setUsernameErrors] = useState<Array<string>>([]);

    function handleFormSubmit(e: TargetData) {
        e.preventDefault();

        const formName: string = e.target.dataset.formname;

        if (formName === "updateUsername") {
            if (!password) {
                setUsernameErrors(["Please type password."]);
            } else if (password !== confirmedPassword) {
                setUsernameErrors(["Passwords do not match."]);
            } else if (!newUsername) {
                setUsernameErrors(["Please type new username."]);
            } else {
                const updatedUser: UpdatedUser = {
                    password,
                    updateInfo: newUsername,
                    updateType: "updateUsername",
                    username
                };

                updateUser(updatedUser)
                    .then((result: SessionAction) => {
                        if (result.type === "RECEIVE_SESSION_ERRORS") {
                            setUsernameErrors(result.errors);
                        } else {
                            setPassword("");
                            setConfirmedPassword("");
                            setNewUsername("");
                            setUsernameErrors([]);
                        }
                    });
            }
        } else {
            if (!oldPassword) {
                setPasswordErrors(["Please type old password."]);
            } else if (oldPassword !== confirmedOldPassword) {
                setPasswordErrors(["Old passwords do not match."]);
            } else if (!newPassword) {
                setPasswordErrors(["Please type new password."]);
            } else if (newPassword !== confirmedNewPassword) {  
                setPasswordErrors(["New passwords do not match."]);
            } else {
                const updatedUser: UpdatedUser = {
                    password: oldPassword,
                    updateInfo: newPassword,
                    updateType: "updatePassword",
                    username
                };
                
                updateUser(updatedUser)
                    .then((result: SessionAction) => {
                        if (result.type === "RECEIVE_SESSION_ERRORS") {
                            setPasswordErrors(result.errors);
                        } else {
                            setOldPassword("");
                            setConfirmedOldPassword("");
                            setNewPassword("");
                            setConfirmedNewPassword("");
                            setPasswordErrors([]);
                        }
                    });
            }
        }
    }

    function errorsDisplay(errors: Array<string>) {
        return (
            <div className="account-profile__errors" data-testid="account-profile__errors">
                <ul className="account-profile__errors-list">
                    {errors.map((error: string, idx: number) => (
                        <li className="account-profile__error" key={idx}>{error}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <>
            <h1 className="account-show__h1">Profile Info</h1>
            <form
                className="account-profile__form"
                onSubmit={handleFormSubmit}
                data-formname="updateUsername"
            >
                <h2 className="account-profile__h2">Update Username</h2>
                {usernameErrors.length > 0 && errorsDisplay(usernameErrors)}
                <label className="account-profile__label" htmlFor="account-profile__password">Password:</label>
                <input
                    className="account-profile__input"
                    id="account-profile__password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                    data-testid="account-profile__password"
                />
                <label className="account-profile__label" htmlFor="account-profile__confirmed-password">Confirm Password:</label>
                <input
                    className="account-profile__input"
                    id="account-profile__confirmed-password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmedPassword(e.target.value)}
                    type="password"
                    value={confirmedPassword}
                    data-testid="account-profile__confirmed-password"
                />
                <label className="account-profile__label" htmlFor="account-profile__new-username">New Username:</label>
                <input
                    className="account-profile__input"
                    id="account-profile__new-username"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUsername(e.target.value)}
                    type="text"
                    value={newUsername}
                    data-testid="account-profile__new-username"
                />
                <input
                    className="account-profile__submit"
                    id="account-profile__username-submit"
                    type="submit"
                    value="Update"
                    data-testid="account-profile__username-submit"
                />
            </form>
            <form
                className="account-profile__form"
                onSubmit={handleFormSubmit}
                data-formname="updatePassword"
            >
                <h2 className="account-profile__h2">Update Password</h2>
                {passwordErrors.length > 0 && errorsDisplay(passwordErrors)}
                <label className="account-profile__label" htmlFor="account-profile__old-password">Old Password:</label>
                <input
                    className="account-profile__input"
                    id="account-profile__old-password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
                    type="password"
                    value={oldPassword}
                    data-testid="account-profile__old-password"
                />
                <label className="account-profile__label" htmlFor="account-profile__confirmed-old-password">Confirm Old Password:</label>
                <input
                    className="account-profile__input"
                    id="account-profile__confirmed-old-password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmedOldPassword(e.target.value)}
                    type="password"
                    value={confirmedOldPassword}
                    data-testid="account-profile__confirmed-old-password"
                />
                <label className="account-profile__label" htmlFor="account-profile__new-password">New Password:</label>
                <input
                    className="account-profile__input"
                    id="account-profile__new-password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                    type="password"
                    value={newPassword}
                    data-testid="account-profile__new-password"
                />
                <label className="account-profile__label" htmlFor="account-profile__confirmed-new-password">Confirm New Password:</label>
                <input
                    className="account-profile__input"
                    id="account-profile__confirmed-new-password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmedNewPassword(e.target.value)}
                    type="password"
                    value={confirmedNewPassword}
                    data-testid="account-profile__confirmed-new-password"
                />
                <input
                    className="account-profile__submit"
                    id="account-profile__password-submit"
                    type="submit"
                    value="Update"
                    data-testid="account-profile__password-submit"
                />
            </form>
        </>
    );
}

export default AccountProfile;