import React, { ChangeEvent, Dispatch, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import * as SessionActions from "../../actions/session_actions"
import { SessionAction, State, UpdatedUser, User } from "../../my_types";

type TargetData = {
    target: {
        dataset: {
            formname: string
        }
    }
} & FormEvent<HTMLFormElement>;

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

    function handleFormSubmit(e: TargetData) {
        e.preventDefault();

        const formName: string = e.target.dataset.formname;
        switch (formName) {
            case "updateUsername":
                if (!password) {
                    setUsernameErrors(["Please type password."]);
                    console.log("correct")
                } else if (password !== confirmedPassword) {
                    setUsernameErrors(["Passwords do not match."]);
                } else if (!newUsername) {
                    setUsernameErrors(["Please type new username."]);
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
                break;
            case "updatePassword":
                if (!oldPassword) {
                    setPasswordErrors(["Please type old password."]);
                    console.log("why?")
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
                break;
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
                        <li className="account-show-profile__error" key={idx}>{error}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <>
            <h1 className="account-show__h1">Profile Info</h1>
            <form
                className="account-show-profile__form"
                onSubmit={handleFormSubmit}
                data-formname="updateUsername"
            >
                <h2 className="account-show-profile__h2">Update Username</h2>
                {usernameErrors.length > 0 && errorsDisplay(usernameErrors)}
                {usernameConfirmation.length > 0 && confirmationDisplay("usernameConfirmation")}
                <label className="account-show-profile__label" htmlFor="account-show-profile__password">Password:</label>
                <input
                    className="account-show-profile__input"
                    id="account-show-profile__password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                />
                <label className="account-show-profile__label" htmlFor="account-show-profile__confirmed-password">Confirm Password:</label>
                <input
                    className="account-show-profile__input"
                    id="account-show-profile__confirmed-password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmedPassword(e.target.value)}
                    type="password"
                    value={confirmedPassword}
                />
                <label className="account-show-profile__label" htmlFor="account-show-profile__new-username">New Username:</label>
                <input
                    className="account-show-profile__input"
                    id="account-show-profile__new-username"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUsername(e.target.value)}
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
            <form
                className="account-show-profile__form"
                onSubmit={handleFormSubmit}
                data-formname="updatePassword"
            >
                <h2 className="account-show-profile__h2">Update Password</h2>
                {passwordErrors.length > 0 && errorsDisplay(passwordErrors)}
                {passwordConfirmation.length > 0 && confirmationDisplay("passwordConfirmation")}
                <label className="account-show-profile__label" htmlFor="account-show-profile__old-password">Old Password:</label>
                <input
                    className="account-show-profile__input"
                    id="account-show-profile__old-password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
                    type="password"
                    value={oldPassword}
                />
                <label className="account-show-profile__label" htmlFor="account-show-profile__confirmed-old-password">Confirm Old Password:</label>
                <input
                    className="account-show-profile__input"
                    id="account-show-profile__confirmed-old-password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmedOldPassword(e.target.value)}
                    type="password"
                    value={confirmedOldPassword}
                />
                <label className="account-show-profile__label" htmlFor="account-show-profile__new-password">New Password:</label>
                <input
                    className="account-show-profile__input"
                    id="account-show-profile__new-password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                    type="password"
                    value={newPassword}
                />
                <label className="account-show-profile__label" htmlFor="account-show-profile__confirmed-new-password">Confirm New Password:</label>
                <input
                    className="account-show-profile__input"
                    id="account-show-profile__confirmed-new-password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmedNewPassword(e.target.value)}
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
        </>
    );
}

export default AccountShowProfile;