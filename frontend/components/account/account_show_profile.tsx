import React, { ChangeEvent, Dispatch, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import * as SessionActions from "../../actions/session_actions"
import { SessionAction, State, UpdatedUser, User } from "../../my_types";

function AccountShowProfile() {
    const currentUser: User = useSelector((state: State) => state.entities.user);

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const updateUser: Function = (updatedUser: UpdatedUser) => dispatch(SessionActions.updateUser(updatedUser));

    const [confirmedNewPassword, setConfirmedNewPassword] = useState<string>("");
    const [confirmedOldPassword, setConfirmedOldPassword] = useState<string>("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [newUsername, setNewUsername] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [passwordErrors, setPasswordErrors] = useState<Array<string>>([]);
    const [usernameConfirmation, setUsernameConfirmation] = useState<string>("");
    const [usernameErrors, setUsernameErrors] = useState<Array<string>>([]);

    function handleInputChange(input: string) {
        switch (input) {
            case "confirmedNewPassword":
                return (e: ChangeEvent<HTMLInputElement>) => setConfirmedNewPassword(e.currentTarget.value);
            case "confirmedOldPassword":
                return (e: ChangeEvent<HTMLInputElement>) => setConfirmedOldPassword(e.currentTarget.value);
            case "confirmedPassword":
                return (e: ChangeEvent<HTMLInputElement>) => setConfirmedPassword(e.currentTarget.value);
            case "newPassword":
                return (e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.currentTarget.value);
            case "newUsername":
                return (e: ChangeEvent<HTMLInputElement>) => setNewUsername(e.currentTarget.value);
            case "oldPassword":
                return (e: ChangeEvent<HTMLInputElement>) => setOldPassword(e.currentTarget.value);
            case "password":
                return (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);
        }
    }

    function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formName: string = e.target.dataset.formname;
        switch (formName) {
            case "updateUsername":
                if (password !== confirmedPassword) {
                    setUsernameErrors(["Passwords do not match."]);
                } else {
                    const updatedUser: UpdatedUser = {
                        password,
                        updateInfo: newUsername,
                        updateType: "updateUsername",
                        username: currentUser.username
                    };
                    updateUser(updatedUser)
                        .then((result: SessionAction) => {
                            if (result.type === "RECEIVE_SESSION_ERRORS") {
                                setUsernameConfirmation("");
                                setUsernameErrors(result.errors);
                            } else {
                                setPassword("");
                                setConfirmedPassword("");
                                setNewUsername("");
                                setUsernameErrors([]);
                                setUsernameConfirmation("Username changed.")
                            }
                        });
                }
            case "updatePassword":
                if (oldPassword !== confirmedOldPassword) {
                    setPasswordErrors(["Old passwords do not match."]);
                } else if (newPassword !== confirmedNewPassword) {  
                    setPasswordErrors(["New passwords do not match."]);
                } else {
                    const updatedUser: UpdatedUser = {
                        password: oldPassword,
                        updateInfo: newPassword,
                        updateType: "updatePassword",
                        username: currentUser.username
                    };
                    updateUser(updatedUser)
                        .then((result: SessionAction) => {
                            if (result.type === "RECEIVE_SESSION_ERRORS") {
                                setPasswordConfirmation("");
                                setPasswordErrors(result.errors);
                            } else {
                                setOldPassword("");
                                setConfirmedOldPassword("");
                                setNewPassword("");
                                setConfirmedNewPassword("");
                                setPasswordErrors([]);
                                setPasswordConfirmation("Password changed.")
                            }
                        });
                }
        }
    }

    function confirmationDisplay(confirmationName: string) {
        switch (confirmationName) {
            case "usernameConfirmation":
                return <p className="account-show-profile__confirmation">Username changed.</p>;
            case "passwordConfirmation":
                return <p className="account-show-profile__confirmation">Password changed.</p>;
        }
    }

    function errorsDisplay(errors: Array<string>) {
        return (
            <div className="account-show-profile__errors">
                <ul className="account-show-profile__errors-list">
                    {errors.map((error: string, idx: number) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="account-show-profile">
            <h1 className="account-show-profile__h1">Profile Info</h1>
            <h2 className="account-show-profile__h2">Update Username</h2>
            <form
                className="account-show-profile__form"
                onSubmit={handleFormSubmit}
                data-formname="updateUsername"
            >
                {usernameErrors.length && errorsDisplay(usernameErrors)}
                {usernameConfirmation.length && confirmationDisplay("usernameConfirmation")}
                <label className="account-show-profile__label" htmlFor="account-show-profile__password">Password:</label>
                <input
                    className="account-show-profile__input"
                    id="account-show-profile__password"
                    onChange={handleInputChange("password")}
                    type="password"
                    value={password}
                />
                <label className="account-show-profile__label" htmlFor="account-show-profile__confirmed-password">Confirm Password:</label>
                <input
                    className="account-show-profile__input"
                    id="account-show-profile__confirmed-password"
                    onChange={handleInputChange("confirmedPassword")}
                    type="password"
                    value={confirmedPassword}
                />
                <label className="account-show-profile__label" htmlFor="account-show-profile__new-username">New Username:</label>
                <input
                    className="account-show-profile__input"
                    id="account-show-profile__new-username"
                    onChange={handleInputChange("newUsername")}
                    type="text"
                    value={newUsername}
                />
                <input
                    className="account-show-profile__submit"
                    id="account-show-profile__username-submit"
                    type="submit"
                    value="Update"
                />
            </form>
            <h2 className="account-show-profile__h2">Update Password</h2>
            <form
                className="account-show-profile__form"
                onSubmit={handleFormSubmit}
                data-formname="updatePassword"
            >
                {passwordErrors.length && errorsDisplay(passwordErrors)}
                {passwordConfirmation.length && confirmationDisplay("passwordConfirmation")}
                <label className="account-show-profile__label" htmlFor="account-show-profile__old-password">Old Password:</label>
                <input
                    className="account-show-profile__input"
                    id="account-show-profile__old-password"
                    onChange={handleInputChange("oldPassword")}
                    type="password"
                    value={oldPassword}
                />
                <label className="account-show-profile__label" htmlFor="account-show-profile__confirmed-old-password">Old Password:</label>
                <input
                    className="account-show-profile__input"
                    id="account-show-profile__confirmed-old-password"
                    onChange={handleInputChange("confirmedOldPassword")}
                    type="password"
                    value={confirmedOldPassword}
                />
                <label className="account-show-profile__label" htmlFor="account-show-profile__new-password">New Password:</label>
                <input
                    className="account-show-profile__input"
                    id="account-show-profile__new-password"
                    onChange={handleInputChange("newPassword")}
                    type="password"
                    value={newPassword}
                />
                <label className="account-show-profile__label" htmlFor="account-show-profile__confirmed-new-password">Confirm New Password:</label>
                <input
                    className="account-show-profile__input"
                    id="account-show-profile__confirmed-new-password"
                    onChange={handleInputChange("confirmedNewPassword")}
                    type="password"
                    value={confirmedNewPassword}
                />
                <input
                    className="account-show-profile__submit"
                    id="account-show-profile__password-submit"
                    type="submit"
                    value="Update"
                />
            </form>
        </div>
    );
}

export default AccountShowProfile;