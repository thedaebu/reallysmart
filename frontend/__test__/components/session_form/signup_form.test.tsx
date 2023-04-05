import React from "react";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import * as reactRedux from "react-redux";
import { renderNonShowComponentWithoutUser } from "../../test_store_data";
import SignupForm from "../../../components/session_form/signup_form";

const useMockDispatch = jest.spyOn(reactRedux, "useDispatch");
const useMockEffect = jest.spyOn(React, "useEffect");
const useMockState = jest.spyOn(React, "useState");

describe("signup form", () => {
    beforeEach(() => {
        renderNonShowComponentWithoutUser(<SignupForm />);
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
    test("useState is called", () => {
        expect(useMockState).toHaveBeenCalled();
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