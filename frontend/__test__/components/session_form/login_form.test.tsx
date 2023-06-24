import React from "react";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import * as reactRedux from "react-redux";
import { renderNonShowComponentWithoutUser } from "../../test_store_data";
import LoginForm from "../../../components/session_form/LoginForm";

const useMockDispatch = jest.spyOn(reactRedux, "useDispatch");
const useMockEffect = jest.spyOn(React, "useEffect");
const useMockState = jest.spyOn(React, "useState");

describe("login form", () => {
    beforeEach(() => {
        renderNonShowComponentWithoutUser(<LoginForm />);
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
    test("proceeds to signup form page when signup form button is clicked", () => {
        const signupFormButton = screen.queryByTestId("signup-form__button");
        userEvent.click(signupFormButton);
        const pathName = global.window.location.pathname;
        expect(pathName).toEqual("/signup");
    });
});