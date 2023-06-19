import { createStore } from "redux";
import { User } from "../../my_types";
import rootReducer from "../../reducers/root_reducer";
import userReducer from "../../reducers/user_reducer";
import { testUserData } from "../test_store_data";

describe("user reducer", () => {
    const testUser: User = testUserData;
    const blankUser: {} = {};

    test("exports a function", () => {
        expect(typeof userReducer).toEqual("function");
    });
    describe("user actions", () => {
        test("initializes with null as the default state", () => {
            expect(userReducer(undefined, {})).toEqual(null);
        });
        test("returns the previous state if an action is not matched", () => {
            const state: User = userReducer(testUser, { type: "NONUSER_ACTION" });
            expect(state).toEqual(testUser);
        });
        describe("RECEIVE_CURRENT_USER action", () => {
            test("returns the data of the current user", () => {
                const state: User = userReducer(null, {
                    errors: [],
                    type: "RECEIVE_CURRENT_USER",
                    user: testUser
                });
                expect(state).toEqual(testUser);
            });
            test("does not modify the previous state", () => {
                expect(blankUser).toEqual(blankUser);
            });
        });
        describe("LOGOUT_CURRENT_USER action", () => {
            test("removes the the current user", () => {
                const state: User = userReducer(testUser, {
                    errors: [],
                    type: "LOGOUT_CURRENT_USER",
                    user: null
                });
                expect(state).toEqual(null);
            });
            test("does not modify the previous state", () => {
                expect(testUser).toEqual(testUser);
            });
        });
    });
    describe("dispatch to store", () => {
        let testStore: any;
        beforeEach(() => {
            testStore = createStore(rootReducer);
        });
        test("contains the correct data for RECEIVE_CURRENT_USER action", () => {
            testStore.dispatch({
                flashMessage: "Log In Successful.",
                type: "RECEIVE_CURRENT_USER",
                user: testUser
            });
            expect(testStore.getState().entities.user).toEqual(testUser);
        });
        test("contains the correct data for LOGOUT_CURRENT_USER", () => {
            testStore.dispatch({
                flashMessage: "Log In Successful.",
                type: "RECEIVE_CURRENT_USER",
                user: testUser
            });
            expect(testStore.getState().entities.user).toEqual(testUser);
            testStore.dispatch({ flashMessage: "Log Out Successful.", type: "LOGOUT_CURRENT_USER" });
            expect(testStore.getState().entities.user).toEqual(null);
        });
    });
});