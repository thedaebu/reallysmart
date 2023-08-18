import { Dispatch } from "react";
import * as AccountAPIUtil from "../util/api/account_api_util";
import { Account, AccountAction } from "../my_types";

export const RECEIVE_ACCOUNT: string = "RECEIVE_ACCOUNT";

const receiveAccount: Function = ({ account }: { account: Account; }) => ({
    account,
    type: RECEIVE_ACCOUNT
});

export const fetchAccount: Function = (userId: number) => (dispatch: Dispatch<AccountAction>) => (
    AccountAPIUtil.fetchAccount(userId)
        .then((account: Account) => dispatch(receiveAccount(account)))
);