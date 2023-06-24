import { createStore } from "redux";
import rootReducer from "../../reducers/root_reducer";
import accountReducer from "../../reducers/account_reducer";
import { testAccountData } from "../test_store_data";
import { Account } from "../../my_types";

describe("account reducer", () => {
    const testAccount: Account = testAccountData;
    Object.freeze(testAccount);

    test("exports a function", () => {
        expect(typeof accountReducer).toEqual("function");
    });
    describe("account actions", () => {
        test("initializes with an empty object as the default state", () => {
            expect(accountReducer(undefined, {})).toEqual({});
        });
        test("returns the previous state if an action is not matched", () => {
            const state: Account = accountReducer(testAccountData, { type: "NONACCOUNT_ACTION" });
            expect(state).toEqual(testAccountData);
        });
        describe("RECEIVE_ACCOUNT action", () => {
            test("returns account data", () => {
                const state: Account = accountReducer({}, { type: "RECEIVE_ACCOUNT", account: testAccount });
                expect(state).toEqual(testAccount);
            });
            test("does not modify the previous state", () => {
                expect(testAccount).toEqual(testAccount);
            });
        });
        describe("LOGOUT_CURRENT_USER action", () => {
            test("returns an empty object", () => {
                const state: Account = accountReducer(testAccount, { type: "LOGOUT_CURRENT_USER" });
                expect(state).toEqual({});
            });
            test("does not modify the previous state", () => {
                expect(testAccount).toEqual(testAccount);
            });
        });
    });
    describe("dispatch to store", () => {
        let testStore: any;
        beforeEach(() => {
            testStore = createStore(rootReducer);
        });
        test("contains the correct data for RECEIVE_ACCOUNT actions", () => {
            testStore.dispatch({
                type: "RECEIVE_ACCOUNT",
                account: testAccount,
                flashMessage: ""
            });
            expect(testStore.getState().entities.account).toEqual(testAccount);
        });
        test("contains the correct data for LOGOUT_CURRENT_USER actions", () => {
            testStore.dispatch({
                type: "LOGOUT_CURRENT_USER",
                flashMessage: ""
            });
            expect(testStore.getState().entities.account).toEqual({});
        });
    });
});