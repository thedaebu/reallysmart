import { createStore } from "redux";
import { User } from "../../my_types";
import rootReducer from "../../reducers/root_reducer";
import userReducer from "../../reducers/user_reducer";
import { testUserData } from "../test_store_data";

describe("user reducer", () => {
    const testUser: { [key: number]: User } = testUserData;
    const blankUser: { [key: number]: User } = {};

    test("exports a function", () => {
        expect(typeof userReducer).toEqual("function");
    });
    describe("user actions", () => {
        test("initializes with an empty object as the default state", () => {
            expect(userReducer(undefined, {})).toEqual({});
        });
        test("returns the previous state if an action is not matched", () => {
            const state: { [key: number]: User } = userReducer(testUser, {type:"NONUSER_ACTION"});
            expect(state).toEqual(testUser);
        });
        describe("RECEIVE_CURRENT_USER action", () => {
            test("returns the data of the current user", () => {
                const state: { [key: number]: User } = userReducer(blankUser, {type: "RECEIVE_CURRENT_USER", user: testUser[1]});
                expect(state).toEqual(testUser);
            });
            test("does not modify the previous state", () => {
                const state: { [key: number]: User } = userReducer(blankUser, {type: "RECEIVE_CURRENT_USER", user: testUser[1]});
                expect(blankUser).toEqual(blankUser);
            });
        });
        describe("LOGOUT_CURRENT_USER action", () => {
            test("removes the the current user", () => {
                const state: { [key: number]: User } = userReducer(testUser, {type: "LOGOUT_CURRENT_USER"});
                expect(state).toEqual(blankUser);
            });
            test("does not modify the previous state", () => {
                const state: { [key: number]: User } = userReducer(testUser, {type: "LOGOUT_CURRENT_USER"});
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
            testStore.dispatch({type: "RECEIVE_CURRENT_USER", user: testUser[1]});
            expect(testStore.getState().entities.user).toEqual(testUser);
        });
        test("contains the correct data for LOGOUT_CURRENT_USER", () => {
            testStore.dispatch({type: "RECEIVE_CURRENT_USER", user: testUser[1]});
            expect(testStore.getState().entities.user).toEqual(testUser);
            testStore.dispatch({type: "LOGOUT_CURRENT_USER"});
            expect(testStore.getState().entities.user).toEqual({});
        });
    });
});