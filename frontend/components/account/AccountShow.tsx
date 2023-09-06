import React, { Dispatch, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../../contexts/theme_context";
import * as AccountActions from "../../actions/account_actions";
import AccountAnnotations from "./AccountAnnotations";
import AccountComments from "./AccountComments";
import AccountHeader from "./AccountHeader";
import AccountProfile from "./AccountProfile";
import Navbar from "../navbar/Navbar";
import { AnyAction } from "@reduxjs/toolkit";
import { Account, State, User } from "../../my_types";

function AccountShow() {
    const account: Account = useSelector((state: State) => state.entities.account);
    const currentUser: User = useSelector((state: State) => state.entities.user);
    const { id, username } = currentUser;
    const { annotations, comments } = account;

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const fetchAccount: Function = (id: number) => dispatch(AccountActions.fetchAccount(id));

    const { theme } = useContext(ThemeContext);

    const [currentTab, setCurrentTab] = useState<string>("Profile");

    useEffect(() => {
        fetchAccount(id);
    }, [currentUser]);

    function handleCurrentTab(tabName: string) {
        setCurrentTab(tabName);
    }

    function accountShowDisplay() {
        switch (currentTab) {
            case "Profile":
                return <AccountProfile username={username} />;
            case "Annotations":
                return <AccountAnnotations annotations={annotations} currentUserId={currentUser.id} />;
            case "Comments":
                return <AccountComments comments={comments} currentUserId={currentUser.id} />;
        }
    }

    return (
        <>
            <Navbar />
            <AccountHeader
                currentTab={currentTab}
                handleCurrentTab={handleCurrentTab}
                username={username}
            />
            <div className={theme === "light" ?
                "account-show__shade" :
                "account-show__shade--dark"
            }>
                <div className="account-show__display" data-testid="account-show__display">
                    {accountShowDisplay()}
                </div>
            </div>
        </>
    );
}

export default AccountShow;