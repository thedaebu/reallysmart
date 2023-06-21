import * as SessionActions from "../../actions/session_actions";
import * as SessionAPIUtil from "../../util/api/session_api_util";
import { mockStore } from "../test_store_data";

describe("session actions", () => {
    describe("constants", () => {
        test("exports a RECEIVE_CURRENT_USER constnat", () => {
            expect(SessionActions.RECEIVE_CURRENT_USER).toEqual("RECEIVE_CURRENT_USER");
        });
        test("exports a LOGOUT_CURRENT_USER constant", () => {
            expect(SessionActions.LOGOUT_CURRENT_USER).toEqual("LOGOUT_CURRENT_USER");
        });
        test("exports a RECEIVE_SESSION_ERRORS constant", () => {
            expect(SessionActions.RECEIVE_SESSION_ERRORS).toEqual("RECEIVE_SESSION_ERRORS");
        });
    });
    describe("functions", () => {
        let store: any;
        beforeEach(() => {
            store = mockStore({ session: {} });
        });
        afterEach(() => {
            store.clearActions();
        });
        describe("signup", () => {
            test("is exported", () => {
                expect(typeof SessionActions.signup).toEqual("function");
            });
            test("dispatches RECEIVE_CURRENT_USER when signup is called", () => {
                const data = { user: { username: "reallysmart" } };
                SessionAPIUtil.signup = jest.fn(() => (
                    Promise.resolve(data)
                ));
                const actions: any = [{ type: "RECEIVE_CURRENT_USER", user: data.user, flashMessage: "Sign Up Successful." }];
                return store.dispatch(SessionActions.signup({password: "reallysmart", username: "reallysmart"})).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
        describe("login", () => {
            test("is exported", () => {
                expect(typeof SessionActions.login).toEqual("function");
            });
            test("dispatches RECEIVE_CURRENT_USER when login is called", () => {
                const data = { user: { username: "reallysmart" } };
                SessionAPIUtil.login = jest.fn(() => (
                    Promise.resolve(data)
                ));
                const actions: any = [{ type: "RECEIVE_CURRENT_USER", user: data.user, flashMessage: "Log In Successful." }];
                return store.dispatch(SessionActions.login({password: "reallysmart", username: "reallysmart"})).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
        describe("logout", () => {
            test("is exported", () => {
                expect(typeof SessionActions.logout).toEqual("function");
            });
            test("dispatches LOGOUT_CURRENT_USER when logout is called", () => {
                SessionAPIUtil.logout = jest.fn(() => (
                    Promise.resolve({})
                ));
                const actions: any = [{ type: "LOGOUT_CURRENT_USER", flashMessage: "Log Out Successful." }];
                return store.dispatch(SessionActions.logout()).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
    });
});