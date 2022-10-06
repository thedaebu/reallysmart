import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as SessionActions from "../../actions/session_actions";
import * as SessionAPIUtil from "../../util/api/session_api_util";
import { Middleware } from "redux";

const middlewares: Array<Middleware> = [ thunk ];
const mockStore = configureMockStore(middlewares);

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
        test("exports a CLEAR_ERRORS constant", () => {
            expect(SessionActions.CLEAR_ERRORS).toEqual("CLEAR_ERRORS");
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
                const actions: any = [{type: "RECEIVE_CURRENT_USER", user: data.user}];
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
                const actions: any = [{type: "RECEIVE_CURRENT_USER", user: data.user}];
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
                const actions: any = [{type: "LOGOUT_CURRENT_USER"}];
                return store.dispatch(SessionActions.logout()).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
        describe("clearSessionErrors", () => {
            test("is exported", () => {
                expect(typeof SessionActions.clearSessionErrors).toEqual("function");
            });
            test("dispatches CLEAR_ERRORS when login is called", () => {
                const actions: any = [{type: "CLEAR_ERRORS"}];
                store.dispatch(SessionActions.clearSessionErrors());
                expect(store.getActions()).toEqual(actions);
            });
        });
    });
});