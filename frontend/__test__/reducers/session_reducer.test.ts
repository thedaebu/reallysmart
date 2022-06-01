import { createStore } from "redux";
import rootReducer from "../../reducers/root_reducer";
import sessionReducer from "../../reducers/session_reducer";
import { testUserData } from "../test_store_data";
import { User } from "../../my_types";

describe("sessions reducer", () => {
    const testUser: { [key: number]: User } = testUserData
    const testSession: { id: number } = {id: 1};
    const blankSession = {id: null};

    test("exports a function", () => {
        expect(typeof sessionReducer).toEqual("function");
    });
    describe("session actions", () => {
        test("initializes with an empty object as the default state", () => {
            expect(sessionReducer({}, {})).toEqual({});
        });
        test("returns the previous state if an action is not matched", () => {
            const state: { id: number } = sessionReducer(testSession, {type: "NONSESSION_ACTION"});
            expect(state).toEqual(testSession);
        });
        describe("RECEIVE_CURRENT_USER action", () => {
            test("returns the id of the current user", () => {
                const state: { id: number } = sessionReducer(blankSession, {type: "RECEIVE_CURRENT_USER", user: testUser[1]});
                expect(state).toEqual(testSession);
            });
            test("does not modify the previous state", () => {
                const state: { id: number } = sessionReducer(blankSession, {type: "RECEIVE_CURRENT_USER", user: testUser[1]});
                expect(blankSession).toEqual(blankSession);
            });
        });
        describe("LOGOUT_CURRENT_USER action", () => {
            test("removes the id of the current user", () => {
                const state: { id: number } = sessionReducer(testSession, {type: "LOGOUT_CURRENT_USER"});
                expect(state).toEqual(blankSession);
            });
            test("does not modify the previous state", () => {
                const state: { id: number } = sessionReducer(testSession, {type: "LOGOUT_CURRENT_USER"});
                expect(testSession).toEqual(testSession);
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
            expect(testStore.getState().session).toEqual(testSession);
        });
        test("contains the correct data for LOGOUT_CURRENT_USER", () => {
            testStore.dispatch({type: "RECEIVE_CURRENT_USER", user: testUser[1]});
            expect(testStore.getState().session).toEqual(testSession);
            testStore.dispatch({type: "LOGOUT_CURRENT_USER"});
            expect(testStore.getState().session).toEqual({id: null});
        });
    });
});