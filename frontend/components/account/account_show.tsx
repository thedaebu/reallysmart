import React, { Dispatch, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import * as AccountActions from "../../actions/account_actions";
import { ThemeContext } from "../../contexts/theme_context";
import Navbar from "../navbar/navbar";
import AccountShowHeader from "./account_show_header";
import AccountShowProfile from "./account_show_profile";
import AccountShowAnnotations from "./account_show_annotations";
import AccountShowComments from "./account_show_comments";
import { Account, State, User } from "../../my_types";

function AccountShow() {
    const currentUser: User = useSelector((state: State) => state.entities.user);
    const account: Account = useSelector((state: State) => state.entities.account);
    const { id, username } = currentUser;
    const { annotations, comments } = account;

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const fetchAccount: Function = (userId: number) => dispatch(AccountActions.fetchAccount(userId));

    const [currentTab, setCurrentTab] = useState<string>("Profile");

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        fetchAccount(id);
    }, [currentUser]);

    function handleCurrentTab(tabName: string) {
        setCurrentTab(tabName);
    }

    function accountShowDisplay() {
        switch (currentTab) {
            case "Profile":
                return <AccountShowProfile username={username} />;
            case "Annotations":
                return <AccountShowAnnotations annotations={annotations} />;
            case "Comments":
                return <AccountShowComments comments={comments} />;
        }
    }

    return (
        <>
            <Navbar />
            <AccountShowHeader
                currentTab={currentTab}
                handleCurrentTab={handleCurrentTab}
                username={username}
            />
            <div className={theme === "light"
                ? "account-show__shade"
                : "account-show__shade--dark"
            }>
                <div className="account-show__main">
                    {accountShowDisplay()}
                </div>
            </div>
        </>
    );
}

export default AccountShow;