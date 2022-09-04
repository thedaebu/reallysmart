import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as reactRedux from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { testShowStoreWithoutUser } from "../../test_store_data";
import * as SessionActions from "../../../actions/session_actions";
import SignupForm from "../../../components/session_form/signup_form";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore(testShowStoreWithoutUser);

const useMockDispatch = jest.spyOn(reactRedux, "useDispatch");
const useMockEffect = jest.spyOn(React, "useEffect");
const useMockSelector = jest.spyOn(reactRedux, "useSelector");
const useMockState = jest.spyOn(React, "useState");
const useMockClearErrors = jest.spyOn(SessionActions, "clearErrors");

describe("signup form", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Provider store={testStore}>
                    <SignupForm />
                </Provider>
            </BrowserRouter>
        );
    });
    afterEach(() => {
        cleanup();
    });

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
    test("clearErrors is called from session actions", () => {
        expect(useMockClearErrors).toHaveBeenCalled();
    });
    describe("input values", () => {
        test("username value changes when user types in username input", () => {
            const usernameInput = screen.queryByTestId("session-form__username");
            userEvent.type(usernameInput, "reallysmart");
            expect(usernameInput).toHaveValue("reallysmart");
        });
        test("password value changes when user types in password input", () => {
            const passwordInput = screen.queryByTestId("session-form__password");
            userEvent.type(passwordInput, "reallysmart");
            expect(passwordInput).toHaveValue("reallysmart");
        });
    });
    test("proceeds to login form page when login form button is clicked", () => {
        const loginFormButton = screen.queryByTestId("login-form-button");
        userEvent.click(loginFormButton);
        const pathName = global.window.location.pathname;
        expect(pathName).toEqual("/login");
    });
});