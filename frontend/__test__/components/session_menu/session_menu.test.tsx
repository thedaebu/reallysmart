import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as reactRedux from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import SessionMenu from "../../../components/session_menu/session_menu";
import { testShowStoreWithoutUser, testShowStoreWithUser } from "../../test_store_data";
import { Store } from "../../../store/store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStoreWithoutUser: any = mockStore(testShowStoreWithoutUser);
const testStoreWithUser: any = mockStore(testShowStoreWithUser);

const useMockDispatch = jest.spyOn(reactRedux, "useDispatch");
const useMockSelector = jest.spyOn(reactRedux, "useSelector");

function renderComponent(store: Store) {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <SessionMenu />
            </Provider>
        </BrowserRouter>
    );
}

describe("session menu", () => {
    describe("user irrelevant tests", () => {
        beforeEach(() => {
            renderComponent(testStoreWithoutUser);
        });
        afterEach(() => {
            cleanup();
        });
        test("useDispatch is called", () => {
            expect(useMockDispatch).toHaveBeenCalled();
        });
        test("useSelector is called", () => {
            expect(useMockSelector).toHaveBeenCalled();
        });
    });
    describe("no user tests", () => {
        beforeEach(() => {
            renderComponent(testStoreWithoutUser);
        });
        afterEach(() => {
            cleanup();
        });
        test("contains link to signup form page", () => {
            const signupLink = screen.queryByTestId("session-menu__signup");
            expect(signupLink).toBeInTheDocument();
        });
        test("proceeds to signup form page when signup link is clicked", () => {
            const signupLink = screen.queryByTestId("session-menu__signup");
            userEvent.click(signupLink);
            const pathName = global.window.location.pathname;
            expect(pathName).toEqual("/signup");
        });
        test("contains the text 'SIGN UP'", () => {
            const signupLink = screen.queryByTestId("session-menu__signup");
            expect(signupLink).toHaveTextContent("SIGN UP");
        });
        test("contains link to login form page", () => {
            const loginLink = screen.queryByTestId("session-menu__login");
            expect(loginLink).toBeInTheDocument();
        });
        test("proceeds to login form page when login link is clicked", () => {
            const loginLink = screen.queryByTestId("session-menu__login");
            userEvent.click(loginLink);
            const pathName = global.window.location.pathname;
            expect(pathName).toEqual("/login");
        });
        test("contains the text 'LOG IN'", () => {
            const loginLink = screen.queryByTestId("session-menu__login");
            expect(loginLink).toHaveTextContent("LOG IN");
        });
        test("does not contain option to log out", () => {
            const logOutLink = screen.queryByTestId("session-menu__logout");
            expect(logOutLink).not.toBeInTheDocument();
        });
    });
    describe("current user tests", () => {
        beforeEach(() => {
            renderComponent(testStoreWithUser);
        });
        afterEach(() => {
            cleanup();
        });
        test("contains option to log out", () => {
            const logOutLink = screen.queryByTestId("session-menu__logout");
            expect(logOutLink).toBeInTheDocument();
        });
        test("does not contain option to sign up", () => {
            const signupLink = screen.queryByTestId("session-menu__signup");
            expect(signupLink).not.toBeInTheDocument();
        });
        test("does not contain option to log in", () => {
            const loginLink = screen.queryByTestId("session-menu__login");
            expect(loginLink).not.toBeInTheDocument();
        });
    });
});