import React from "react";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as reactRedux from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import server from "../msw_server"
import { testTrackStore } from "../test_store_data";
import * as SessionActions from "../../actions/session_actions";
import SignupForm from "../../components/session_form/signup_form";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore(testTrackStore);

const useMockClearErrors = jest.spyOn(SessionActions, 'clearErrors');
const useMockDispatch = jest.spyOn(reactRedux, 'useDispatch');
const useMockEffect = jest.spyOn(React, 'useEffect');
const useMockSelector = jest.spyOn(reactRedux, 'useSelector');
const useMockSignup = jest.spyOn(SessionActions, 'signup');
const useMockState = jest.spyOn(React, 'useState');

describe("login form", () => {
    // beforeAll(() => server.listen());
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Provider store={testStore}>
                    <SignupForm />
                </Provider>
            </BrowserRouter>
        );
    })
    afterEach(() => {
        cleanup()
        // server.resetHandlers()
    });
    // afterAll(() => server.close());

    test("useDispatch is called", () => {
        expect(useMockDispatch).toHaveBeenCalled();
    });
    test("useEffect is called", () => {
        expect(useMockEffect).toHaveBeenCalled();
    });
    test("useSelector is called", () => {
        expect(useMockSelector).toHaveBeenCalled();
    });
    test("useState is called", () => {
        expect(useMockState).toHaveBeenCalled();
    });
    test("clearErrors is called when the login form is rendered", () => {
        expect(useMockClearErrors).toHaveBeenCalled();
    });
    test("typing in the username field gives it the proper value", () => {
        const usernameField = screen.queryByTestId("session-form__username");
        userEvent.type(usernameField, "reallysmart");
        expect(usernameField).toHaveValue("reallysmart");
    });
    test("typing in the password field gives it the proper value", () => {
        const passwordField = screen.queryByTestId("session-form__password");
        userEvent.type(passwordField, "reallysmart");
        expect(passwordField).toHaveValue("reallysmart");
    });
    test("signup is called when the Login button is clicked on", () => {
        expect(useMockSignup).not.toHaveBeenCalled();
        const signupButton = screen.queryByTestId("session-form__submit");
        userEvent.click(signupButton);
        expect(useMockSignup).toHaveBeenCalled();
    });
    test("url proceeds to login form when login link is pressed", () => {
        const loginLink = screen.queryByTestId("login-redirect");
        userEvent.click(loginLink);
        const pathName = global.window.location.pathname;
        expect(pathName).toEqual('/login');
    });
});