import * as AccountActions from "../../actions/account_actions";
import * as AccountAPIUtil from "../../util/api/account_api_util";
import { mockStore, testAccountData } from "../test_store_data";
import { MockStoreEnhanced } from "redux-mock-store";
import { Account } from "../../my_types";

describe("account actions", () => {
    describe("constants", () => {
        test("exports a RECEIVE ACCOUNT constant", () => {
            expect(AccountActions.RECEIVE_ACCOUNT).toEqual("RECEIVE_ACCOUNT");
        });
    });
    describe("functions", () => {
        const account: Account = testAccountData;
        let store: MockStoreEnhanced = mockStore({ account: {} });
        beforeEach(() => {
            store = mockStore({ account: {} });
        });
        afterEach(() => {
            store.clearActions();
        });
        describe("fetchAccount", () => {
            test("is exported", () => {
                expect(typeof AccountActions.fetchAccount).toEqual("function");
            });
            test("dispatches RECEIVE_ACCOUNT when fetchAccount is called", () => {
                const data = { account };
                AccountAPIUtil.fetchAccount = jest.fn((accountId: number) => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "RECEIVE_ACCOUNT", account: data.account }];
                return store.dispatch(AccountActions.fetchAccount(1)).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
    });
});