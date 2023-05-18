import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { Account, AccountAction, State, User } from "../../my_types";
import * as AccountActions from "../../actions/account_actions"
import AccountShowHeader from "./account_show_header";
import Navbar from "../navbar/navbar";

function AccountShow() {
    const currentUser: User = useSelector((state: State) => state.entities.user);
    const account: Account = useSelector((state: State) => state.entities.account);

    const dispatch: any = useDispatch();
    const fetchAccount: Function = (userId: number) => dispatch(AccountActions.fetchAccount(userId));

    const [currentTab, setCurrentTab] = useState<string>("Profile");

    useEffect(() => {
        fetchAccount(currentUser.id);
    }, []);

    function handleCurrentTab(tabName: string) {
        setCurrentTab(tabName);
    }

    return (
        <>
            <Navbar />
            <AccountShowHeader
                currentTab={currentTab}
                handleCurrentTab={handleCurrentTab}
                username={account.username}
            />
        </>
    );
}

export default AccountShow;